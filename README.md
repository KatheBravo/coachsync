from pathlib import Path

# Contenido del README.md
readme_content = """# 🚀 CoachSync

CoachSync es una plataforma diseñada para que cada coach tenga acceso rápido y centralizado a toda la información relevante de sus clientes. Permite un seguimiento eficiente del progreso, historial y fichas personales, mejorando la personalización y calidad del acompañamiento.

---

## 🛠️ Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. **Clona el repositorio**

```bash
git clone https://github.com/KatheBravo/coachsync.git
cd coachsync


python3 -m venv venv
source venv/bin/activate  # En Windows: venv\\Scripts\\activate

pip install -r requirements.txt


python main.py


## 🧩 Patrones de Diseño Implementados

- **MVC (Modelo-Vista-Controlador)**  
  Separación clara entre lógica de negocio (Modelos), gestión de rutas y peticiones (Controladores), y presentación de datos (Vistas/Respuestas).

- **Repository Pattern**  
  Abstracción del acceso a los datos mediante repositorios, lo que facilita el mantenimiento y escalabilidad del sistema.

- **Dependency Injection**  
  Las dependencias (como la base de datos) se inyectan en los controladores para mejorar la modularidad y facilidad de pruebas.

- **RESTful API**  
  La API sigue principios REST, con endpoints bien estructurados y recursos claramente definidos.

---

## 📚 Endpoints Principales

### `/api/v1/users/`
- `GET`: Listar usuarios  
- `POST`: Crear usuario  

### `/api/v1/users/coach/{coach_id}/clients`
- `GET`: Obtener todos los clientes de un coach específico  

### `/api/v1/ficha_cliente/{cliente_id}`
- `GET`: Obtener ficha de cliente  
- `PUT`: Actualizar ficha  
- `DELETE`: Eliminar ficha  

### `/api/v1/historial_cliente/cliente/{cliente_id}`
- `GET`: Obtener historial del cliente  

### `/api/v1/progreso_cliente/cliente/{cliente_id}`
- `GET`: Obtener progreso del cliente  
