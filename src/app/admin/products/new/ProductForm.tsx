"use client"

import { useState } from "react"
import { createProduct } from "./actions"
import { Wand2, Loader2, UploadCloud } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

type Category = {
  id: string
  name: string
}

export default function ProductForm({ categories }: { categories: Category[] }) {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
  })

  const handleScrape = async () => {
    if (!url) return
    setIsLoading(true)
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      
      if (res.ok) {
        const data = await res.json()
        setFormData({
          name: data.title || "",
          slug: data.title ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : "",
          image: data.image || "",
        })
      } else {
        alert("No se pudo extraer la información automáticamente. Las páginas muy seguras pueden bloquear el acceso. Por favor, llena los datos manualmente.")
      }
    } catch (error) {
      console.error(error)
      alert("Error de conexión al intentar importar.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from('products').getPublicUrl(filePath)
      
      setFormData({ ...formData, image: data.publicUrl })
    } catch (error: any) {
      console.error("Error uploading image:", error)
      alert("Error al subir la imagen: " + error.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 space-y-8">
      
      {/* Importador Mágico */}
      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl space-y-3">
        <label className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
          <Wand2 className="w-4 h-4" /> Importador Mágico
        </label>
        <p className="text-xs text-indigo-700 dark:text-indigo-400">Pega el enlace de un proveedor (AliExpress, Falabella, etc.) para extraer el nombre y la foto automáticamente.</p>
        <div className="flex gap-2">
          <input 
            type="url" 
            placeholder="https://es.aliexpress.com/item/..." 
            className="flex-1 rounded-lg border border-indigo-200 dark:border-indigo-700/50 bg-white dark:bg-neutral-900 px-4 py-2 text-sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            type="button" 
            onClick={handleScrape}
            disabled={isLoading || !url}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Extraer"}
          </button>
        </div>
      </div>

      <hr className="border-neutral-200 dark:border-neutral-800" />

      {/* Formulario Original */}
      <form action={createProduct} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Nombre del Producto</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2" 
              placeholder="Ej: Cámara de Seguridad 360"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">URL amigable (Slug)</label>
            <input 
              type="text" 
              id="slug" 
              name="slug" 
              required 
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2" 
              placeholder="ej: camara-seguridad-360"
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
            />
            <p className="text-xs text-neutral-500">Sin espacios, solo letras, números y guiones.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="price_clp" className="text-sm font-medium">Precio de Venta (CLP)</label>
            <input type="number" id="price_clp" name="price_clp" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2" placeholder="Ej: 24990" />
          </div>

          <div className="space-y-2">
            <label htmlFor="stock" className="text-sm font-medium">Stock Inicial</label>
            <input type="number" id="stock" name="stock" required defaultValue={10} className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="categoryId" className="text-sm font-medium">Categoría</label>
          <select id="categoryId" name="categoryId" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2 text-neutral-900 dark:text-neutral-100">
            <option value="">Selecciona una categoría...</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium">Imagen del Producto</label>
          <div className="flex gap-4 items-start">
            <div className="flex-1 space-y-2">
              <input 
                type="url" 
                id="image" 
                name="image" 
                required 
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2" 
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
              <p className="text-xs text-neutral-500">Pega una URL o sube una imagen desde tu computadora.</p>
            </div>
            
            <div className="relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              <button 
                type="button"
                className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                {isUploading ? "Subiendo..." : "Subir Foto"}
              </button>
            </div>
          </div>
          {formData.image && (
            <div className="mt-4 p-2 border border-neutral-200 dark:border-neutral-800 rounded-lg inline-block bg-white dark:bg-neutral-900">
              <img src={formData.image} alt="Preview" className="h-32 object-contain rounded" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">Descripción</label>
          <textarea id="description" name="description" rows={4} className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2" placeholder="Describe los beneficios del producto..."></textarea>
        </div>

        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
          <button type="submit" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-sm">
            Guardar Producto en Catálogo
          </button>
        </div>
      </form>
    </div>
  )
}
