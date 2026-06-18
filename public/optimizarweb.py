import os
from PIL import Image

def procesar_archivos(ruta_carpeta):
    print(f"Buscando archivos en: {ruta_carpeta}")
    archivos_procesados = False
    
    for archivo in os.listdir(ruta_carpeta):
        ruta_completa = os.path.join(ruta_carpeta, archivo)
        nombre_sin_ext = os.path.splitext(archivo)[0]
        ext = archivo.lower()
        
        # Procesar imágenes comunes
        if ext.endswith(('.png', '.jpg', '.jpeg')):
            archivos_procesados = True
            
            img = Image.open(ruta_completa)
            ruta_webp = os.path.join(ruta_carpeta, f"{nombre_sin_ext}.webp")
            
            img.save(ruta_webp, "webp", optimize=True, quality=80)
            print(f"✅ Imagen convertida: {archivo} -> {nombre_sin_ext}.webp")
            
        # Procesar PDF
        elif ext.endswith('.pdf'):
            archivos_procesados = True
            try:
                import fitz  # PyMuPDF
                print(f"📄 Procesando PDF: {archivo}")
                doc = fitz.open(ruta_completa)
                for i, pagina in enumerate(doc):
                    pix = pagina.get_pixmap(dpi=150)
                    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                    ruta_webp = os.path.join(ruta_carpeta, f"{nombre_sin_ext}_slide{i+1}.webp")
                    img.save(ruta_webp, "webp", optimize=True, quality=80)
                    print(f"✅ Diapositiva de PDF convertida: {nombre_sin_ext}_slide{i+1}.webp")
            except ImportError:
                print(f"⚠️ Para convertir el PDF '{archivo}' necesitas instalar PyMuPDF. Ejecuta: pip install PyMuPDF")

        # PPTX (Mensaje de aviso)
        elif ext.endswith(('.pptx', '.ppt')):
            print(f"⚠️ El archivo PPTX/PPT ({archivo}) no se puede convertir directamente con este script.")
            print("   -> Recomendación: Abre la presentación en PowerPoint, ve a 'Guardar como' y elige 'PDF' o 'Imágenes JPEG'. Luego el script podrá procesarlo.")
            
    if not archivos_procesados:
        print("⚠️ No se encontraron imágenes (.jpg, .png) o PDFs en esta carpeta para procesar.")

if __name__ == "__main__":
    procesar_archivos(os.getcwd())
    print("¡Proceso finalizado!")