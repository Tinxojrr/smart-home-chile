"use client"

import { useState } from "react"
import { createProduct } from "./actions"
import { Wand2, Loader2 } from "lucide-react"

type Category = {
  id: string
  name: string
}

export default function ProductForm({ categories }: { categories: Category[] }) {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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
          <label htmlFor="image" className="text-sm font-medium">URL de la Imagen Principal</label>
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
          <p className="text-xs text-neutral-500">Copia la dirección de la imagen de tu proveedor o usa el Importador Mágico.</p>
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
