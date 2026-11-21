// GENERADO por scripts/generate-model.mjs a partir de ../mockup. No editar a mano.
export default {
 "modules": {
  "usuarios": {
   "key": "usuarios",
   "table": "usuarios",
   "title": "Usuarios",
   "icon": "users",
   "desc": "Cuentas de acceso al sistema y su perfil.",
   "group": "Personas",
   "sub": null,
   "bi": null,
   "ex": [
    "Con MFA activo",
    "4 de 8"
   ],
   "kp": null,
   "cols": [
    {
     "k": "usuario",
     "l": "Usuario",
     "t": "p"
    },
    {
     "k": "rol",
     "l": "Rol",
     "t": "g"
    },
    {
     "k": "departamento",
     "l": "Departamento",
     "t": "t"
    },
    {
     "k": "ultimo_acceso",
     "l": "Último acceso",
     "t": "d"
    },
    {
     "k": "mfa",
     "l": "MFA",
     "t": "t"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "trabajador_id",
     "base": "FK",
     "en": null,
     "fk": "trabajadores",
     "desc": "Persona de planilla vinculada a la cuenta",
     "nullable": true,
     "unique": true
    },
    {
     "k": "nombres",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Nombres",
     "nullable": false,
     "unique": false
    },
    {
     "k": "apellidos",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Apellidos",
     "nullable": false,
     "unique": false
    },
    {
     "k": "email",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Correo (usuario de acceso)",
     "nullable": false,
     "unique": true
    },
    {
     "k": "password_hash",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Hash bcrypt, nunca texto plano",
     "nullable": false,
     "unique": false
    },
    {
     "k": "telefono",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Teléfono de contacto",
     "nullable": true,
     "unique": false
    },
    {
     "k": "avatar_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Foto de perfil",
     "nullable": true,
     "unique": false
    },
    {
     "k": "rol_id",
     "base": "FK",
     "en": null,
     "fk": "roles",
     "desc": "Rol asignado",
     "nullable": false,
     "unique": false
    },
    {
     "k": "departamento_id",
     "base": "FK",
     "en": null,
     "fk": "departamentos",
     "desc": "Departamento",
     "nullable": false,
     "unique": false
    },
    {
     "k": "idioma",
     "base": "enum",
     "en": [
      "es",
      "en"
     ],
     "fk": null,
     "desc": "Idioma de la interfaz",
     "nullable": false,
     "unique": false
    },
    {
     "k": "tema",
     "base": "enum",
     "en": [
      "claro",
      "oscuro",
      "sistema"
     ],
     "fk": null,
     "desc": "Preferencia de apariencia",
     "nullable": false,
     "unique": false
    },
    {
     "k": "mfa_activo",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Verificación en dos pasos",
     "nullable": false,
     "unique": false
    },
    {
     "k": "mfa_secreto",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Secreto TOTP cifrado",
     "nullable": true,
     "unique": false
    },
    {
     "k": "intentos_fallidos",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Contador para bloqueo",
     "nullable": false,
     "unique": false
    },
    {
     "k": "bloqueado_hasta",
     "base": "datetime",
     "en": null,
     "fk": null,
     "desc": "Bloqueo temporal por intentos",
     "nullable": true,
     "unique": false
    },
    {
     "k": "debe_cambiar_clave",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Obliga cambio en el próximo ingreso",
     "nullable": false,
     "unique": false
    },
    {
     "k": "ultima_ip",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "IP del último acceso",
     "nullable": true,
     "unique": false
    },
    {
     "k": "token_recuperacion",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Token de restablecimiento",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "roles": {
   "key": "roles",
   "table": "roles",
   "title": "Roles",
   "icon": "shield",
   "desc": "Perfiles de acceso y permisos por módulo.",
   "group": "Personas",
   "sub": null,
   "bi": null,
   "ex": [
    "Permisos definidos",
    "64"
   ],
   "kp": null,
   "cols": [
    {
     "k": "rol",
     "l": "Rol",
     "t": "x"
    },
    {
     "k": "nivel",
     "l": "Nivel",
     "t": "n"
    },
    {
     "k": "usuarios",
     "l": "Usuarios",
     "t": "n"
    },
    {
     "k": "modulos",
     "l": "Módulos",
     "t": "n"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "codigo",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Código corto (ADMIN, MAESTRO…)",
     "nullable": false,
     "unique": true
    },
    {
     "k": "nombre",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Nombre visible",
     "nullable": false,
     "unique": true
    },
    {
     "k": "descripcion",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Alcance del rol",
     "nullable": true,
     "unique": false
    },
    {
     "k": "es_sistema",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Rol protegido, no editable",
     "nullable": false,
     "unique": false
    },
    {
     "k": "permisos",
     "base": "json",
     "en": null,
     "fk": null,
     "desc": "Matriz módulo → ver/crear/editar/borrar/aprobar",
     "nullable": false,
     "unique": false
    },
    {
     "k": "modulos_visibles",
     "base": "json",
     "en": null,
     "fk": null,
     "desc": "Módulos del menú",
     "nullable": false,
     "unique": false
    },
    {
     "k": "restringe_por_proyecto",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Limita datos a sus proyectos",
     "nullable": false,
     "unique": false
    },
    {
     "k": "requiere_mfa",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Obliga MFA a este rol",
     "nullable": false,
     "unique": false
    },
    {
     "k": "activo",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Disponible para asignar",
     "nullable": false,
     "unique": false
    }
   ],
   "custom": false
  },
  "catalogos": {
   "key": "catalogos",
   "table": "catalogos",
   "title": "Catálogos",
   "icon": "book",
   "desc": "Listas maestras: unidades, monedas, categorías, cuentas.",
   "group": "Datos",
   "sub": null,
   "bi": null,
   "ex": [
    "Tipos de catálogo",
    "9"
   ],
   "kp": null,
   "cols": [
    {
     "k": "codigo",
     "l": "Código",
     "t": "c"
    },
    {
     "k": "nombre",
     "l": "Nombre",
     "t": "t"
    },
    {
     "k": "tipo",
     "l": "Tipo",
     "t": "g"
    },
    {
     "k": "orden",
     "l": "Orden",
     "t": "n"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "descripcion",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Notas de uso",
     "nullable": true,
     "unique": false
    },
    {
     "k": "padre_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Jerarquía (categoría → subcategoría)",
     "nullable": true,
     "unique": false
    },
    {
     "k": "valor_extra",
     "base": "json",
     "en": null,
     "fk": null,
     "desc": "Datos propios del tipo (tasa, símbolo…)",
     "nullable": true,
     "unique": false
    },
    {
     "k": "es_sistema",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "No eliminable",
     "nullable": false,
     "unique": false
    },
    {
     "k": "activo",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Disponible en formularios",
     "nullable": false,
     "unique": false
    }
   ],
   "custom": false
  },
  "proyectos": {
   "key": "proyectos",
   "table": "proyectos",
   "title": "Proyectos",
   "icon": "building",
   "desc": "Obras en ejecución, presupuesto y responsables.",
   "group": "Operación",
   "sub": null,
   "bi": null,
   "ex": [
    "Presupuesto total",
    "Q 41.1 M"
   ],
   "kp": null,
   "cols": [
    {
     "k": "proyecto",
     "l": "Proyecto",
     "t": "x"
    },
    {
     "k": "ubicacion",
     "l": "Ubicación",
     "t": "t"
    },
    {
     "k": "maestro_de_obra",
     "l": "Maestro de obra",
     "t": "p"
    },
    {
     "k": "avance",
     "l": "Avance",
     "t": "b"
    },
    {
     "k": "presupuesto",
     "l": "Presupuesto",
     "t": "m"
    },
    {
     "k": "entrega",
     "l": "Entrega",
     "t": "d"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "codigo",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Código (PRY-001)",
     "nullable": false,
     "unique": true
    },
    {
     "k": "nombre",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Nombre de la obra",
     "nullable": false,
     "unique": false
    },
    {
     "k": "descripcion",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Alcance general",
     "nullable": true,
     "unique": false
    },
    {
     "k": "cliente_id",
     "base": "FK",
     "en": null,
     "fk": "proveedores",
     "desc": "Cliente / dueño de la obra",
     "nullable": true,
     "unique": false
    },
    {
     "k": "tipo_obra",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Vivienda, comercial, infraestructura…",
     "nullable": false,
     "unique": false
    },
    {
     "k": "direccion",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Dirección",
     "nullable": false,
     "unique": false
    },
    {
     "k": "departamento_geo",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Departamento (geográfico)",
     "nullable": false,
     "unique": false
    },
    {
     "k": "municipio",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Municipio",
     "nullable": false,
     "unique": false
    },
    {
     "k": "latitud",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Coordenada",
     "nullable": true,
     "unique": false
    },
    {
     "k": "longitud",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Coordenada",
     "nullable": true,
     "unique": false
    },
    {
     "k": "fecha_inicio",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Inicio real",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_fin_estimada",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Entrega comprometida",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_fin_real",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Entrega efectiva",
     "nullable": true,
     "unique": false
    },
    {
     "k": "costo_real",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Acumulado ejecutado",
     "nullable": false,
     "unique": false
    },
    {
     "k": "moneda_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Moneda",
     "nullable": false,
     "unique": false
    },
    {
     "k": "area_construccion_m2",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Superficie",
     "nullable": true,
     "unique": false
    },
    {
     "k": "avance_pct",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Avance físico 0-100",
     "nullable": false,
     "unique": false
    },
    {
     "k": "maestro_obra_id",
     "base": "FK",
     "en": null,
     "fk": "trabajadores",
     "desc": "Responsable en campo",
     "nullable": false,
     "unique": false
    },
    {
     "k": "residente_id",
     "base": "FK",
     "en": null,
     "fk": "trabajadores",
     "desc": "Residente / ingeniero",
     "nullable": true,
     "unique": false
    },
    {
     "k": "centro_costo_id",
     "base": "FK",
     "en": null,
     "fk": "departamentos",
     "desc": "Centro de costo contable",
     "nullable": false,
     "unique": false
    },
    {
     "k": "prioridad",
     "base": "enum",
     "en": [
      "baja",
      "media",
      "alta"
     ],
     "fk": null,
     "desc": "Prioridad",
     "nullable": false,
     "unique": false
    }
   ],
   "custom": false
  },
  "proveedores": {
   "key": "proveedores",
   "table": "proveedores",
   "title": "Proveedores",
   "icon": "truck",
   "desc": "Empresas que abastecen materiales y servicios.",
   "group": "Finanzas",
   "sub": null,
   "bi": null,
   "ex": [
    "Crédito promedio",
    "24 días"
   ],
   "kp": null,
   "cols": [
    {
     "k": "proveedor",
     "l": "Proveedor",
     "t": "x"
    },
    {
     "k": "contacto",
     "l": "Contacto",
     "t": "p"
    },
    {
     "k": "telefono",
     "l": "Teléfono",
     "t": "t"
    },
    {
     "k": "credito",
     "l": "Crédito",
     "t": "n"
    },
    {
     "k": "calificacion",
     "l": "Calificación",
     "t": "r"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "razon_social",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Razón social",
     "nullable": false,
     "unique": false
    },
    {
     "k": "nombre_comercial",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Nombre comercial",
     "nullable": true,
     "unique": false
    },
    {
     "k": "nit",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "NIT (validación módulo 11)",
     "nullable": false,
     "unique": true
    },
    {
     "k": "tipo",
     "base": "enum",
     "en": [
      "proveedor",
      "contratista",
      "cliente"
     ],
     "fk": null,
     "desc": "Rol de la entidad",
     "nullable": false,
     "unique": false
    },
    {
     "k": "categoria_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Rubro principal",
     "nullable": true,
     "unique": false
    },
    {
     "k": "contacto_nombre",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Persona de contacto",
     "nullable": false,
     "unique": false
    },
    {
     "k": "email",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Correo",
     "nullable": true,
     "unique": false
    },
    {
     "k": "direccion",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Dirección fiscal",
     "nullable": true,
     "unique": false
    },
    {
     "k": "banco_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Banco",
     "nullable": true,
     "unique": false
    },
    {
     "k": "cuenta_bancaria",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "No. de cuenta",
     "nullable": true,
     "unique": false
    },
    {
     "k": "condicion_pago_dias",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Días de crédito",
     "nullable": false,
     "unique": false
    },
    {
     "k": "limite_credito",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Límite autorizado",
     "nullable": true,
     "unique": false
    },
    {
     "k": "regimen_fiscal",
     "base": "enum",
     "en": [
      "general",
      "pequeno_contribuyente",
      "exento"
     ],
     "fk": null,
     "desc": "Régimen tributario",
     "nullable": false,
     "unique": false
    },
    {
     "k": "retiene_isr",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Aplica retención",
     "nullable": false,
     "unique": false
    },
    {
     "k": "notas",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Observaciones",
     "nullable": true,
     "unique": false
    },
    {
     "k": "activo",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Habilitado para compras",
     "nullable": false,
     "unique": false
    }
   ],
   "custom": false
  },
  "trabajadores": {
   "key": "trabajadores",
   "table": "trabajadores",
   "title": "Trabajadores",
   "icon": "hardhat",
   "desc": "Personal de planilla y de obra.",
   "group": "Personas",
   "sub": null,
   "bi": null,
   "ex": [
    "Planilla diaria",
    "Q 6,310"
   ],
   "kp": null,
   "cols": [
    {
     "k": "trabajador",
     "l": "Trabajador",
     "t": "p"
    },
    {
     "k": "puesto",
     "l": "Puesto",
     "t": "g"
    },
    {
     "k": "proyecto",
     "l": "Proyecto",
     "t": "c"
    },
    {
     "k": "contrato",
     "l": "Contrato",
     "t": "g"
    },
    {
     "k": "salario_diario",
     "l": "Salario diario",
     "t": "m"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "codigo_empleado",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Código de planilla",
     "nullable": false,
     "unique": true
    },
    {
     "k": "dpi",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "DPI (13 dígitos)",
     "nullable": false,
     "unique": true
    },
    {
     "k": "nit",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "NIT",
     "nullable": true,
     "unique": false
    },
    {
     "k": "nombres",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Nombres",
     "nullable": false,
     "unique": false
    },
    {
     "k": "apellidos",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Apellidos",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_nacimiento",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Nacimiento",
     "nullable": false,
     "unique": false
    },
    {
     "k": "genero",
     "base": "enum",
     "en": [
      "f",
      "m",
      "otro"
     ],
     "fk": null,
     "desc": "Género",
     "nullable": true,
     "unique": false
    },
    {
     "k": "estado_civil",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Estado civil",
     "nullable": true,
     "unique": false
    },
    {
     "k": "telefono",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Teléfono",
     "nullable": false,
     "unique": false
    },
    {
     "k": "telefono_emergencia",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Contacto de emergencia",
     "nullable": false,
     "unique": false
    },
    {
     "k": "nombre_emergencia",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Nombre del contacto",
     "nullable": false,
     "unique": false
    },
    {
     "k": "direccion",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Domicilio",
     "nullable": true,
     "unique": false
    },
    {
     "k": "foto_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Foto",
     "nullable": true,
     "unique": false
    },
    {
     "k": "puesto_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Puesto",
     "nullable": false,
     "unique": false
    },
    {
     "k": "departamento_id",
     "base": "FK",
     "en": null,
     "fk": "departamentos",
     "desc": "Departamento",
     "nullable": false,
     "unique": false
    },
    {
     "k": "proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Proyecto actual",
     "nullable": true,
     "unique": false
    },
    {
     "k": "jefe_inmediato_id",
     "base": "FK",
     "en": null,
     "fk": "trabajadores",
     "desc": "Supervisor",
     "nullable": true,
     "unique": false
    },
    {
     "k": "fecha_ingreso",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Ingreso",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_baja",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Baja",
     "nullable": true,
     "unique": false
    },
    {
     "k": "tipo_contrato",
     "base": "enum",
     "en": [
      "planilla",
      "por_obra",
      "servicios"
     ],
     "fk": null,
     "desc": "Contrato",
     "nullable": false,
     "unique": false
    },
    {
     "k": "bonificacion",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Bonificación de ley",
     "nullable": false,
     "unique": false
    },
    {
     "k": "igss_afiliacion",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "No. de afiliación IGSS",
     "nullable": true,
     "unique": false
    },
    {
     "k": "banco_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Banco para pago",
     "nullable": true,
     "unique": false
    },
    {
     "k": "cuenta_bancaria",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Cuenta de depósito",
     "nullable": true,
     "unique": false
    },
    {
     "k": "tipo_sangre",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Seguridad ocupacional",
     "nullable": true,
     "unique": false
    },
    {
     "k": "talla_casco",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "EPP",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "metas": {
   "key": "metas",
   "table": "metas",
   "title": "Metas",
   "icon": "target",
   "desc": "Hitos y objetivos por proyecto.",
   "group": "Operación",
   "sub": null,
   "bi": null,
   "ex": [
    "Cumplimiento",
    "71 %"
   ],
   "kp": null,
   "cols": [
    {
     "k": "meta",
     "l": "Meta",
     "t": "x"
    },
    {
     "k": "responsable",
     "l": "Responsable",
     "t": "p"
    },
    {
     "k": "fecha_limite",
     "l": "Fecha límite",
     "t": "d"
    },
    {
     "k": "prioridad",
     "l": "Prioridad",
     "t": "g"
    },
    {
     "k": "avance",
     "l": "Avance",
     "t": "b"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Proyecto",
     "nullable": false,
     "unique": false
    },
    {
     "k": "meta_padre_id",
     "base": "FK",
     "en": null,
     "fk": "metas",
     "desc": "Meta superior (desglose)",
     "nullable": true,
     "unique": false
    },
    {
     "k": "titulo",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Título",
     "nullable": false,
     "unique": false
    },
    {
     "k": "descripcion",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Detalle",
     "nullable": true,
     "unique": false
    },
    {
     "k": "responsable_id",
     "base": "FK",
     "en": null,
     "fk": "trabajadores",
     "desc": "Responsable",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_inicio",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Inicio",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_cumplimiento",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Fecha real",
     "nullable": true,
     "unique": false
    },
    {
     "k": "unidad_medida_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Unidad (m³, m², %)",
     "nullable": true,
     "unique": false
    },
    {
     "k": "cantidad_meta",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Cantidad objetivo",
     "nullable": true,
     "unique": false
    },
    {
     "k": "cantidad_lograda",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Cantidad alcanzada",
     "nullable": true,
     "unique": false
    },
    {
     "k": "avance_pct",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Avance 0-100",
     "nullable": false,
     "unique": false
    },
    {
     "k": "evidencia_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Foto o documento",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "compras": {
   "key": "compras",
   "table": "compras",
   "title": "Compras",
   "icon": "cart",
   "desc": "Órdenes de compra y aprobaciones.",
   "group": "Finanzas",
   "sub": null,
   "bi": null,
   "ex": [
    "Por aprobar",
    "Q 135,700"
   ],
   "kp": null,
   "cols": [
    {
     "k": "orden",
     "l": "Orden",
     "t": "c"
    },
    {
     "k": "proveedor",
     "l": "Proveedor",
     "t": "t"
    },
    {
     "k": "proyecto",
     "l": "Proyecto",
     "t": "c"
    },
    {
     "k": "fecha",
     "l": "Fecha",
     "t": "d"
    },
    {
     "k": "total",
     "l": "Total",
     "t": "m"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "numero_oc",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Correlativo OC-AAAA-###",
     "nullable": false,
     "unique": true
    },
    {
     "k": "proveedor_id",
     "base": "FK",
     "en": null,
     "fk": "proveedores",
     "desc": "Proveedor",
     "nullable": false,
     "unique": false
    },
    {
     "k": "proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Proyecto destino",
     "nullable": false,
     "unique": false
    },
    {
     "k": "bodega_destino_id",
     "base": "FK",
     "en": null,
     "fk": "bodegas",
     "desc": "Bodega del proyecto que recibe",
     "nullable": true,
     "unique": false
    },
    {
     "k": "requisicion_id",
     "base": "FK",
     "en": null,
     "fk": "compras",
     "desc": "Requisición de origen",
     "nullable": true,
     "unique": false
    },
    {
     "k": "fecha_entrega_estimada",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Entrega prometida",
     "nullable": true,
     "unique": false
    },
    {
     "k": "condicion_pago_dias",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Crédito",
     "nullable": false,
     "unique": false
    },
    {
     "k": "moneda_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Moneda",
     "nullable": false,
     "unique": false
    },
    {
     "k": "tipo_cambio",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Tipo de cambio",
     "nullable": false,
     "unique": false
    },
    {
     "k": "subtotal",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Subtotal",
     "nullable": false,
     "unique": false
    },
    {
     "k": "descuento",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Descuento",
     "nullable": false,
     "unique": false
    },
    {
     "k": "iva",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "IVA (12%)",
     "nullable": false,
     "unique": false
    },
    {
     "k": "lugar_entrega",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Bodega/obra",
     "nullable": true,
     "unique": false
    },
    {
     "k": "observaciones",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Notas",
     "nullable": true,
     "unique": false
    },
    {
     "k": "solicitado_por",
     "base": "FK",
     "en": null,
     "fk": "usuarios",
     "desc": "Solicitante",
     "nullable": false,
     "unique": false
    },
    {
     "k": "aprobado_por",
     "base": "FK",
     "en": null,
     "fk": "usuarios",
     "desc": "Aprobador",
     "nullable": true,
     "unique": false
    },
    {
     "k": "fecha_aprobacion",
     "base": "datetime",
     "en": null,
     "fk": null,
     "desc": "Aprobación",
     "nullable": true,
     "unique": false
    },
    {
     "k": "motivo_rechazo",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Razón de rechazo",
     "nullable": true,
     "unique": false
    },
    {
     "k": "adjunto_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Cotización PDF",
     "nullable": true,
     "unique": false
    },
    {
     "k": "detalle",
     "base": "json",
     "en": null,
     "fk": null,
     "desc": "Líneas: inventario_id, cantidad, precio, subtotal",
     "nullable": false,
     "unique": false
    }
   ],
   "custom": false
  },
  "tesoreria": {
   "key": "tesoreria",
   "table": "tesoreria",
   "title": "Tesorería",
   "icon": "bank",
   "desc": "Ingresos, egresos y conciliación bancaria.",
   "group": "Finanzas",
   "sub": null,
   "bi": null,
   "ex": [
    "Saldo disponible",
    "Q 1.84 M"
   ],
   "kp": null,
   "cols": [
    {
     "k": "fecha",
     "l": "Fecha",
     "t": "d"
    },
    {
     "k": "concepto",
     "l": "Concepto",
     "t": "x"
    },
    {
     "k": "cuenta",
     "l": "Cuenta",
     "t": "g"
    },
    {
     "k": "tipo",
     "l": "Tipo",
     "t": "g"
    },
    {
     "k": "monto",
     "l": "Monto",
     "t": "mv"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "cuenta_bancaria_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Cuenta afectada",
     "nullable": false,
     "unique": false
    },
    {
     "k": "cuenta_destino_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Para traslados",
     "nullable": true,
     "unique": false
    },
    {
     "k": "fecha_valor",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Fecha valor bancaria",
     "nullable": true,
     "unique": false
    },
    {
     "k": "moneda_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Moneda",
     "nullable": false,
     "unique": false
    },
    {
     "k": "tipo_cambio",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Tipo de cambio",
     "nullable": false,
     "unique": false
    },
    {
     "k": "forma_pago",
     "base": "enum",
     "en": [
      "transferencia",
      "cheque",
      "efectivo",
      "tarjeta"
     ],
     "fk": null,
     "desc": "Forma de pago",
     "nullable": false,
     "unique": false
    },
    {
     "k": "referencia",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "No. boleta / cheque",
     "nullable": true,
     "unique": false
    },
    {
     "k": "beneficiario",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Pagado a / recibido de",
     "nullable": true,
     "unique": false
    },
    {
     "k": "compra_id",
     "base": "FK",
     "en": null,
     "fk": "compras",
     "desc": "Orden pagada",
     "nullable": true,
     "unique": false
    },
    {
     "k": "cxp_id",
     "base": "FK",
     "en": null,
     "fk": "cxp",
     "desc": "Cuenta por pagar que cancela",
     "nullable": true,
     "unique": false
    },
    {
     "k": "cxc_id",
     "base": "FK",
     "en": null,
     "fk": "cxc",
     "desc": "Cuenta por cobrar que se cobra",
     "nullable": true,
     "unique": false
    },
    {
     "k": "proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Proyecto",
     "nullable": true,
     "unique": false
    },
    {
     "k": "asiento_id",
     "base": "FK",
     "en": null,
     "fk": "contabilidad",
     "desc": "Asiento generado",
     "nullable": true,
     "unique": false
    },
    {
     "k": "conciliado",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Conciliado con banco",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_conciliacion",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Conciliación",
     "nullable": true,
     "unique": false
    },
    {
     "k": "comprobante_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Boleta escaneada",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "reportes": {
   "key": "reportes",
   "table": "reportes",
   "title": "Reportes",
   "icon": "chart",
   "desc": "Informes programados y bajo demanda.",
   "group": "Datos",
   "sub": null,
   "bi": null,
   "ex": [
    "Programados",
    "8"
   ],
   "kp": null,
   "cols": [
    {
     "k": "reporte",
     "l": "Reporte",
     "t": "x"
    },
    {
     "k": "modulo",
     "l": "Módulo",
     "t": "g"
    },
    {
     "k": "formato",
     "l": "Formato",
     "t": "g"
    },
    {
     "k": "frecuencia",
     "l": "Frecuencia",
     "t": "g"
    },
    {
     "k": "ultima_ejecucion",
     "l": "Última ejecución",
     "t": "d"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "nombre",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Nombre del reporte",
     "nullable": false,
     "unique": false
    },
    {
     "k": "descripcion",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Objetivo",
     "nullable": true,
     "unique": false
    },
    {
     "k": "consulta_definicion",
     "base": "json",
     "en": null,
     "fk": null,
     "desc": "Filtros, columnas, agrupaciones",
     "nullable": false,
     "unique": false
    },
    {
     "k": "programacion",
     "base": "enum",
     "en": [
      "bajo_demanda",
      "diario",
      "semanal",
      "mensual"
     ],
     "fk": null,
     "desc": "Frecuencia",
     "nullable": false,
     "unique": false
    },
    {
     "k": "hora_envio",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Hora programada",
     "nullable": true,
     "unique": false
    },
    {
     "k": "destinatarios",
     "base": "json",
     "en": null,
     "fk": null,
     "desc": "Correos",
     "nullable": false,
     "unique": false
    },
    {
     "k": "ultimo_archivo_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Archivo generado",
     "nullable": true,
     "unique": false
    },
    {
     "k": "visibilidad",
     "base": "enum",
     "en": [
      "privado",
      "rol",
      "publico"
     ],
     "fk": null,
     "desc": "Quién lo ve",
     "nullable": false,
     "unique": false
    },
    {
     "k": "activo",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Habilitado",
     "nullable": false,
     "unique": false
    }
   ],
   "custom": false
  },
  "contabilidad": {
   "key": "contabilidad",
   "table": "asientos",
   "title": "Libro diario",
   "icon": "ledger",
   "desc": "Asientos contables de partida doble bajo NIIF.",
   "group": "Finanzas",
   "sub": "conta",
   "bi": null,
   "ex": [
    "Asientos del mes",
    "48"
   ],
   "kp": null,
   "cols": [
    {
     "k": "asiento",
     "l": "Asiento",
     "t": "c"
    },
    {
     "k": "fecha",
     "l": "Fecha",
     "t": "d"
    },
    {
     "k": "cuenta",
     "l": "Cuenta",
     "t": "x"
    },
    {
     "k": "debe",
     "l": "Debe",
     "t": "m"
    },
    {
     "k": "haber",
     "l": "Haber",
     "t": "m"
    },
    {
     "k": "norma",
     "l": "Norma",
     "t": "g"
    }
   ],
   "extras": [
    {
     "k": "numero_asiento",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Correlativo",
     "nullable": false,
     "unique": false
    },
    {
     "k": "periodo_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Período (AAAA-MM)",
     "nullable": false,
     "unique": false
    },
    {
     "k": "linea",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Línea dentro del asiento",
     "nullable": false,
     "unique": false
    },
    {
     "k": "cuenta_id",
     "base": "FK",
     "en": null,
     "fk": "plan",
     "desc": "Cuenta del plan de cuentas",
     "nullable": false,
     "unique": false
    },
    {
     "k": "cuenta_codigo",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Código de cuenta (copia para reportes)",
     "nullable": false,
     "unique": false
    },
    {
     "k": "cuenta_nombre",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Nombre de cuenta",
     "nullable": false,
     "unique": false
    },
    {
     "k": "descripcion",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Glosa",
     "nullable": false,
     "unique": false
    },
    {
     "k": "moneda_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Moneda",
     "nullable": false,
     "unique": false
    },
    {
     "k": "tipo_cambio",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Tipo de cambio",
     "nullable": false,
     "unique": false
    },
    {
     "k": "tipo_asiento",
     "base": "enum",
     "en": [
      "manual",
      "automatico",
      "ajuste",
      "cierre"
     ],
     "fk": null,
     "desc": "Origen",
     "nullable": false,
     "unique": false
    },
    {
     "k": "centro_costo_id",
     "base": "FK",
     "en": null,
     "fk": "departamentos",
     "desc": "Centro de costo",
     "nullable": true,
     "unique": false
    },
    {
     "k": "proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Proyecto",
     "nullable": true,
     "unique": false
    },
    {
     "k": "documento_tipo",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Compra, tesorería, activo…",
     "nullable": true,
     "unique": false
    },
    {
     "k": "documento_id",
     "base": "uuid",
     "en": null,
     "fk": null,
     "desc": "Registro origen",
     "nullable": true,
     "unique": false
    },
    {
     "k": "conciliado",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Revisado por contador",
     "nullable": false,
     "unique": false
    },
    {
     "k": "cerrado",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Período cerrado (inmutable)",
     "nullable": false,
     "unique": false
    }
   ],
   "custom": false
  },
  "activos": {
   "key": "activos",
   "table": "activos",
   "title": "Activos",
   "icon": "tractor",
   "desc": "Maquinaria, vehículos y herramienta mayor.",
   "group": "Operación",
   "sub": null,
   "bi": null,
   "ex": [
    "Valor en libros",
    "Q 1.9 M"
   ],
   "kp": null,
   "cols": [
    {
     "k": "activo",
     "l": "Activo",
     "t": "x"
    },
    {
     "k": "categoria",
     "l": "Categoría",
     "t": "g"
    },
    {
     "k": "ubicacion",
     "l": "Ubicación",
     "t": "t"
    },
    {
     "k": "costo",
     "l": "Costo",
     "t": "m"
    },
    {
     "k": "depreciacion",
     "l": "Depreciación",
     "t": "b"
    },
    {
     "k": "responsable",
     "l": "Responsable",
     "t": "p"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "codigo",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Código de activo (ACT-###)",
     "nullable": false,
     "unique": true
    },
    {
     "k": "descripcion",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Descripción",
     "nullable": false,
     "unique": false
    },
    {
     "k": "marca",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Marca",
     "nullable": true,
     "unique": false
    },
    {
     "k": "modelo",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Modelo",
     "nullable": true,
     "unique": false
    },
    {
     "k": "serie",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Serie / placa",
     "nullable": true,
     "unique": true
    },
    {
     "k": "categoria_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Categoría",
     "nullable": false,
     "unique": false
    },
    {
     "k": "proveedor_id",
     "base": "FK",
     "en": null,
     "fk": "proveedores",
     "desc": "Comprado a",
     "nullable": true,
     "unique": false
    },
    {
     "k": "compra_id",
     "base": "FK",
     "en": null,
     "fk": "compras",
     "desc": "Orden de compra",
     "nullable": true,
     "unique": false
    },
    {
     "k": "fecha_adquisicion",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Adquisición",
     "nullable": false,
     "unique": false
    },
    {
     "k": "valor_residual",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Valor residual",
     "nullable": false,
     "unique": false
    },
    {
     "k": "vida_util_meses",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Vida útil",
     "nullable": false,
     "unique": false
    },
    {
     "k": "metodo_depreciacion",
     "base": "enum",
     "en": [
      "linea_recta",
      "saldos_decrecientes",
      "unidades"
     ],
     "fk": null,
     "desc": "Método NIIF",
     "nullable": false,
     "unique": false
    },
    {
     "k": "depreciacion_acumulada",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Depreciación acumulada",
     "nullable": false,
     "unique": false
    },
    {
     "k": "valor_en_libros",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Valor neto",
     "nullable": false,
     "unique": false
    },
    {
     "k": "horas_uso",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Horómetro",
     "nullable": true,
     "unique": false
    },
    {
     "k": "ultimo_mantenimiento",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Último servicio",
     "nullable": true,
     "unique": false
    },
    {
     "k": "proximo_mantenimiento",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Próximo servicio",
     "nullable": true,
     "unique": false
    },
    {
     "k": "ubicacion_proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Ubicación",
     "nullable": true,
     "unique": false
    },
    {
     "k": "responsable_id",
     "base": "FK",
     "en": null,
     "fk": "trabajadores",
     "desc": "Responsable",
     "nullable": false,
     "unique": false
    },
    {
     "k": "poliza_seguro",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Póliza",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "migraciones": {
   "key": "migraciones",
   "table": "migraciones",
   "title": "Depuración y migraciones",
   "icon": "migrate",
   "desc": "Importa Excel o sistemas legacy y estandariza la información.",
   "group": "Datos",
   "sub": null,
   "bi": null,
   "ex": [
    "Registros depurados",
    "10,982"
   ],
   "kp": null,
   "cols": [
    {
     "k": "origen",
     "l": "Origen",
     "t": "x"
    },
    {
     "k": "destino",
     "l": "Destino",
     "t": "g"
    },
    {
     "k": "filas",
     "l": "Filas",
     "t": "n"
    },
    {
     "k": "validas",
     "l": "Válidas",
     "t": "n"
    },
    {
     "k": "errores",
     "l": "Errores",
     "t": "n"
    },
    {
     "k": "fecha",
     "l": "Fecha",
     "t": "d"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "nombre_origen",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Archivo o sistema",
     "nullable": false,
     "unique": false
    },
    {
     "k": "tipo_origen",
     "base": "enum",
     "en": [
      "excel",
      "csv",
      "bd_legacy",
      "api"
     ],
     "fk": null,
     "desc": "Tipo de fuente",
     "nullable": false,
     "unique": false
    },
    {
     "k": "conexion_ref",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Referencia a conexión (sin credenciales)",
     "nullable": true,
     "unique": false
    },
    {
     "k": "hoja_o_tabla",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Hoja / tabla leída",
     "nullable": true,
     "unique": false
    },
    {
     "k": "modulo_destino",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Módulo destino",
     "nullable": false,
     "unique": false
    },
    {
     "k": "plantilla_id",
     "base": "FK",
     "en": null,
     "fk": "migraciones",
     "desc": "Plantilla de mapeo reutilizable",
     "nullable": true,
     "unique": false
    },
    {
     "k": "mapeo_columnas",
     "base": "json",
     "en": null,
     "fk": null,
     "desc": "origen → campo estándar",
     "nullable": false,
     "unique": false
    },
    {
     "k": "reglas_depuracion",
     "base": "json",
     "en": null,
     "fk": null,
     "desc": "Trim, mayúsculas, duplicados, homologar",
     "nullable": false,
     "unique": false
    },
    {
     "k": "filas_leidas",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Leídas",
     "nullable": false,
     "unique": false
    },
    {
     "k": "filas_validas",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Válidas",
     "nullable": false,
     "unique": false
    },
    {
     "k": "filas_duplicadas",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Fusionadas",
     "nullable": false,
     "unique": false
    },
    {
     "k": "filas_error",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Con error",
     "nullable": false,
     "unique": false
    },
    {
     "k": "modo",
     "base": "enum",
     "en": [
      "simulacion",
      "importacion"
     ],
     "fk": null,
     "desc": "Simulación o carga real",
     "nullable": false,
     "unique": false
    },
    {
     "k": "puede_revertir",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Admite deshacer",
     "nullable": false,
     "unique": false
    },
    {
     "k": "lote_importacion",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Identificador del lote",
     "nullable": false,
     "unique": true
    },
    {
     "k": "ejecutado_por",
     "base": "FK",
     "en": null,
     "fk": "usuarios",
     "desc": "Quien ejecutó",
     "nullable": false,
     "unique": false
    },
    {
     "k": "iniciado_en",
     "base": "datetime",
     "en": null,
     "fk": null,
     "desc": "Inicio",
     "nullable": false,
     "unique": false
    },
    {
     "k": "finalizado_en",
     "base": "datetime",
     "en": null,
     "fk": null,
     "desc": "Fin",
     "nullable": true,
     "unique": false
    },
    {
     "k": "log_errores",
     "base": "json",
     "en": null,
     "fk": null,
     "desc": "Detalle por fila",
     "nullable": true,
     "unique": false
    },
    {
     "k": "archivo_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Respaldo del archivo original",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "departamentos": {
   "key": "departamentos",
   "table": "departamentos",
   "title": "Departamentos",
   "icon": "org",
   "desc": "Estructura organizacional y centros de costo.",
   "group": "Personas",
   "sub": null,
   "bi": null,
   "ex": [
    "Centros de costo",
    "6"
   ],
   "kp": null,
   "cols": [
    {
     "k": "departamento",
     "l": "Departamento",
     "t": "x"
    },
    {
     "k": "jefe",
     "l": "Jefe",
     "t": "p"
    },
    {
     "k": "personal",
     "l": "Personal",
     "t": "n"
    },
    {
     "k": "presupuesto_anual",
     "l": "Presupuesto anual",
     "t": "m"
    },
    {
     "k": "ejecucion",
     "l": "Ejecución",
     "t": "b"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "codigo",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Código del departamento",
     "nullable": false,
     "unique": true
    },
    {
     "k": "nombre",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Nombre",
     "nullable": false,
     "unique": false
    },
    {
     "k": "descripcion",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Funciones",
     "nullable": true,
     "unique": false
    },
    {
     "k": "centro_costo",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Centro de costo (CC-###)",
     "nullable": false,
     "unique": true
    },
    {
     "k": "jefe_id",
     "base": "FK",
     "en": null,
     "fk": "trabajadores",
     "desc": "Jefe",
     "nullable": true,
     "unique": false
    },
    {
     "k": "padre_id",
     "base": "FK",
     "en": null,
     "fk": "departamentos",
     "desc": "Departamento superior",
     "nullable": true,
     "unique": false
    },
    {
     "k": "moneda_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Moneda",
     "nullable": false,
     "unique": false
    },
    {
     "k": "cuenta_contable",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Cuenta de gasto asociada",
     "nullable": true,
     "unique": false
    },
    {
     "k": "activo",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Vigente",
     "nullable": false,
     "unique": false
    }
   ],
   "custom": false
  },
  "inventarios": {
   "key": "inventarios",
   "table": "inventarios",
   "title": "Inventarios",
   "icon": "box",
   "desc": "Existencias por proyecto y bodega. El mismo material puede estar en varias obras, cada una con su stock y su costo.",
   "group": "Operación",
   "sub": null,
   "bi": 3,
   "ex": [
    "Valor en bodegas",
    "Q 1.6 M"
   ],
   "kp": null,
   "cols": [
    {
     "k": "material",
     "l": "Material",
     "t": "x"
    },
    {
     "k": "categoria",
     "l": "Categoría",
     "t": "g"
    },
    {
     "k": "proyecto",
     "l": "Proyecto",
     "t": "c"
    },
    {
     "k": "bodega",
     "l": "Bodega",
     "t": "t"
    },
    {
     "k": "existencia",
     "l": "Existencia",
     "t": "k"
    },
    {
     "k": "unidad",
     "l": "Unidad",
     "t": "t"
    },
    {
     "k": "costo_prom",
     "l": "Costo prom.",
     "t": "m"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "sku",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Código del material (puede repetirse entre proyectos)",
     "nullable": false,
     "unique": false
    },
    {
     "k": "proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Proyecto dueño del inventario",
     "nullable": false,
     "unique": false
    },
    {
     "k": "bodega_id",
     "base": "FK",
     "en": null,
     "fk": "bodegas",
     "desc": "Bodega donde está físicamente",
     "nullable": false,
     "unique": false
    },
    {
     "k": "codigo_barras",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "EAN / QR",
     "nullable": true,
     "unique": false
    },
    {
     "k": "descripcion",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Nombre del material",
     "nullable": false,
     "unique": false
    },
    {
     "k": "especificacion",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Ficha técnica",
     "nullable": true,
     "unique": false
    },
    {
     "k": "categoria_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Categoría",
     "nullable": false,
     "unique": false
    },
    {
     "k": "unidad_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Unidad de medida",
     "nullable": false,
     "unique": false
    },
    {
     "k": "proveedor_habitual_id",
     "base": "FK",
     "en": null,
     "fk": "proveedores",
     "desc": "Proveedor sugerido",
     "nullable": true,
     "unique": false
    },
    {
     "k": "ubicacion_fisica",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Pasillo / estante",
     "nullable": true,
     "unique": false
    },
    {
     "k": "stock_actual",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Existencia en esta bodega",
     "nullable": false,
     "unique": false
    },
    {
     "k": "stock_reservado",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Comprometido en solicitudes aprobadas",
     "nullable": false,
     "unique": false
    },
    {
     "k": "stock_minimo",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Punto de reorden",
     "nullable": false,
     "unique": false
    },
    {
     "k": "stock_maximo",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Tope recomendado",
     "nullable": true,
     "unique": false
    },
    {
     "k": "costo_promedio",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Costo promedio ponderado en esta bodega",
     "nullable": false,
     "unique": false
    },
    {
     "k": "ultimo_costo",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Última compra",
     "nullable": false,
     "unique": false
    },
    {
     "k": "moneda_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Moneda del costo",
     "nullable": false,
     "unique": false
    },
    {
     "k": "lleva_lote",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Controla lotes/vencimiento",
     "nullable": false,
     "unique": false
    },
    {
     "k": "imagen_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Foto",
     "nullable": true,
     "unique": false
    },
    {
     "k": "activo",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Disponible",
     "nullable": false,
     "unique": false
    }
   ],
   "custom": false
  },
  "bodega": {
   "key": "bodega",
   "table": "movimientos_bodega",
   "title": "Movimientos de bodega",
   "icon": "warehouse",
   "desc": "Entradas, salidas y traslados. Elige una bodega para ver solo sus movimientos.",
   "group": "Operación",
   "sub": null,
   "bi": 4,
   "ex": [
    "Movimientos hoy",
    "4"
   ],
   "kp": null,
   "cols": [
    {
     "k": "fecha",
     "l": "Fecha",
     "t": "d"
    },
    {
     "k": "movimiento",
     "l": "Movimiento",
     "t": "g"
    },
    {
     "k": "material",
     "l": "Material",
     "t": "t"
    },
    {
     "k": "cantidad",
     "l": "Cantidad",
     "t": "n"
    },
    {
     "k": "bodega",
     "l": "Bodega",
     "t": "t"
    },
    {
     "k": "proyecto",
     "l": "Proyecto",
     "t": "c"
    },
    {
     "k": "solicito",
     "l": "Solicitó",
     "t": "p"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "numero_documento",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Correlativo del vale",
     "nullable": false,
     "unique": true
    },
    {
     "k": "tipo",
     "base": "enum",
     "en": [
      "entrada",
      "salida",
      "traslado",
      "ajuste"
     ],
     "fk": null,
     "desc": "Tipo de movimiento",
     "nullable": false,
     "unique": false
    },
    {
     "k": "bodega_origen_id",
     "base": "FK",
     "en": null,
     "fk": "bodegas",
     "desc": "Bodega que entrega o recibe",
     "nullable": false,
     "unique": false
    },
    {
     "k": "bodega_destino_id",
     "base": "FK",
     "en": null,
     "fk": "bodegas",
     "desc": "Destino (solo traslados)",
     "nullable": true,
     "unique": false
    },
    {
     "k": "proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Proyecto al que se carga el costo",
     "nullable": false,
     "unique": false
    },
    {
     "k": "inventario_id",
     "base": "FK",
     "en": null,
     "fk": "inventarios",
     "desc": "Material en esa bodega",
     "nullable": false,
     "unique": false
    },
    {
     "k": "costo_unitario",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Costo promedio al momento del movimiento",
     "nullable": false,
     "unique": false
    },
    {
     "k": "lote",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Lote",
     "nullable": true,
     "unique": false
    },
    {
     "k": "compra_id",
     "base": "FK",
     "en": null,
     "fk": "compras",
     "desc": "Orden de compra (entradas)",
     "nullable": true,
     "unique": false
    },
    {
     "k": "solicitud_id",
     "base": "FK",
     "en": null,
     "fk": "bodega",
     "desc": "Solicitud que originó el despacho",
     "nullable": true,
     "unique": false
    },
    {
     "k": "solicitado_por",
     "base": "FK",
     "en": null,
     "fk": "trabajadores",
     "desc": "Quien pide",
     "nullable": false,
     "unique": false
    },
    {
     "k": "entregado_a",
     "base": "FK",
     "en": null,
     "fk": "trabajadores",
     "desc": "Quien recibe",
     "nullable": true,
     "unique": false
    },
    {
     "k": "autorizado_por",
     "base": "FK",
     "en": null,
     "fk": "usuarios",
     "desc": "Quien autoriza",
     "nullable": true,
     "unique": false
    },
    {
     "k": "fecha_autorizacion",
     "base": "datetime",
     "en": null,
     "fk": null,
     "desc": "Momento de autorización",
     "nullable": true,
     "unique": false
    },
    {
     "k": "motivo_ajuste",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Para ajustes de inventario",
     "nullable": true,
     "unique": false
    },
    {
     "k": "firma_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Firma de recepción",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "bodegas": {
   "key": "bodegas",
   "table": "bodegas",
   "title": "Bodegas",
   "icon": "warehouse",
   "desc": "Cada proyecto tiene sus bodegas. Aquí se administran y se comparan.",
   "group": "Operación",
   "sub": null,
   "bi": null,
   "ex": [
    "Bodegas activas",
    "5"
   ],
   "kp": null,
   "cols": [
    {
     "k": "bodega",
     "l": "Bodega",
     "t": "x"
    },
    {
     "k": "proyecto",
     "l": "Proyecto",
     "t": "c"
    },
    {
     "k": "responsable",
     "l": "Responsable",
     "t": "p"
    },
    {
     "k": "items",
     "l": "Ítems",
     "t": "n"
    },
    {
     "k": "valor_inventario",
     "l": "Valor inventario",
     "t": "m"
    },
    {
     "k": "mov_mes",
     "l": "Mov. (mes)",
     "t": "n"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "codigo",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Código (BOD-001)",
     "nullable": false,
     "unique": true
    },
    {
     "k": "nombre",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Nombre visible",
     "nullable": false,
     "unique": false
    },
    {
     "k": "proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Proyecto al que pertenece (obligatorio)",
     "nullable": false,
     "unique": false
    },
    {
     "k": "tipo",
     "base": "enum",
     "en": [
      "principal",
      "satelite",
      "patio",
      "transito"
     ],
     "fk": null,
     "desc": "Tipo de bodega",
     "nullable": false,
     "unique": false
    },
    {
     "k": "responsable_id",
     "base": "FK",
     "en": null,
     "fk": "trabajadores",
     "desc": "Bodeguero a cargo",
     "nullable": false,
     "unique": false
    },
    {
     "k": "direccion",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Ubicación dentro de la obra",
     "nullable": true,
     "unique": false
    },
    {
     "k": "capacidad_m2",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Superficie",
     "nullable": true,
     "unique": false
    },
    {
     "k": "permite_traslados",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Puede enviar/recibir de otras obras",
     "nullable": false,
     "unique": false
    },
    {
     "k": "requiere_autorizacion_salida",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Toda salida necesita autorización",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_apertura",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Apertura",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_cierre",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Se cierra al terminar la obra",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "plan": {
   "key": "plan",
   "table": "plan_cuentas",
   "title": "Plan de cuentas",
   "icon": "table",
   "desc": "Catálogo de cuentas contables y la norma que respalda a cada una.",
   "group": null,
   "sub": "conta",
   "bi": null,
   "ex": [
    "Cuentas activas",
    "142"
   ],
   "kp": null,
   "cols": [
    {
     "k": "codigo",
     "l": "Código",
     "t": "c"
    },
    {
     "k": "cuenta",
     "l": "Cuenta",
     "t": "x"
    },
    {
     "k": "tipo",
     "l": "Tipo",
     "t": "g"
    },
    {
     "k": "nivel",
     "l": "Nivel",
     "t": "n"
    },
    {
     "k": "norma",
     "l": "Norma",
     "t": "g"
    },
    {
     "k": "saldo",
     "l": "Saldo",
     "t": "m"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "nombre",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Nombre de la cuenta",
     "nullable": false,
     "unique": false
    },
    {
     "k": "naturaleza",
     "base": "enum",
     "en": [
      "deudora",
      "acreedora"
     ],
     "fk": null,
     "desc": "Naturaleza del saldo",
     "nullable": false,
     "unique": false
    },
    {
     "k": "clasificacion_corriente",
     "base": "enum",
     "en": [
      "corriente",
      "no_corriente",
      "na"
     ],
     "fk": null,
     "desc": "Para el estado de situación financiera",
     "nullable": false,
     "unique": false
    },
    {
     "k": "padre_id",
     "base": "FK",
     "en": null,
     "fk": "plan",
     "desc": "Cuenta superior",
     "nullable": true,
     "unique": false
    },
    {
     "k": "acepta_movimientos",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Solo las hojas reciben asientos",
     "nullable": false,
     "unique": false
    },
    {
     "k": "norma_referencia",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "NIC/NIIF/Sección que la respalda",
     "nullable": false,
     "unique": false
    },
    {
     "k": "moneda_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Moneda",
     "nullable": false,
     "unique": false
    },
    {
     "k": "requiere_centro_costo",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Exige centro de costo",
     "nullable": false,
     "unique": false
    },
    {
     "k": "requiere_proyecto",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Exige proyecto",
     "nullable": false,
     "unique": false
    },
    {
     "k": "cuenta_estado_resultados",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Se refleja en resultados",
     "nullable": false,
     "unique": false
    },
    {
     "k": "activo",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Vigente",
     "nullable": false,
     "unique": false
    }
   ],
   "custom": false
  },
  "cxp": {
   "key": "cxp",
   "table": "cuentas_por_pagar",
   "title": "Cuentas por pagar",
   "icon": "trendd",
   "desc": "Lo que se debe a proveedores, vencimientos y antigüedad de saldos.",
   "group": null,
   "sub": "conta",
   "bi": null,
   "ex": [
    "Total por pagar",
    "Q 230,680"
   ],
   "kp": null,
   "cols": [
    {
     "k": "documento",
     "l": "Documento",
     "t": "c"
    },
    {
     "k": "proveedor",
     "l": "Proveedor",
     "t": "x"
    },
    {
     "k": "emision",
     "l": "Emisión",
     "t": "d"
    },
    {
     "k": "vence",
     "l": "Vence",
     "t": "d"
    },
    {
     "k": "saldo",
     "l": "Saldo",
     "t": "m"
    },
    {
     "k": "antiguedad",
     "l": "Antigüedad",
     "t": "g"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "proveedor_id",
     "base": "FK",
     "en": null,
     "fk": "proveedores",
     "desc": "Proveedor",
     "nullable": false,
     "unique": false
    },
    {
     "k": "factura_id",
     "base": "FK",
     "en": null,
     "fk": "frec",
     "desc": "Factura recibida que origina la deuda",
     "nullable": false,
     "unique": false
    },
    {
     "k": "compra_id",
     "base": "FK",
     "en": null,
     "fk": "compras",
     "desc": "Orden de compra",
     "nullable": true,
     "unique": false
    },
    {
     "k": "proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Proyecto al que se imputa",
     "nullable": false,
     "unique": false
    },
    {
     "k": "centro_costo_id",
     "base": "FK",
     "en": null,
     "fk": "departamentos",
     "desc": "Centro de costo",
     "nullable": true,
     "unique": false
    },
    {
     "k": "fecha_emision",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Emisión de la factura",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_vencimiento",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Según crédito pactado",
     "nullable": false,
     "unique": false
    },
    {
     "k": "condicion_pago_dias",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Días de crédito",
     "nullable": false,
     "unique": false
    },
    {
     "k": "moneda_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Moneda",
     "nullable": false,
     "unique": false
    },
    {
     "k": "tipo_cambio",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Tipo de cambio",
     "nullable": false,
     "unique": false
    },
    {
     "k": "monto_original",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Total de la factura",
     "nullable": false,
     "unique": false
    },
    {
     "k": "retenciones",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "IVA/ISR retenidos",
     "nullable": false,
     "unique": false
    },
    {
     "k": "monto_pagado",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Pagos aplicados",
     "nullable": false,
     "unique": false
    },
    {
     "k": "dias_vencido",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Calculado diariamente",
     "nullable": false,
     "unique": false
    },
    {
     "k": "descuento_pronto_pago",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Descuento si paga antes",
     "nullable": true,
     "unique": false
    },
    {
     "k": "asiento_id",
     "base": "FK",
     "en": null,
     "fk": "contabilidad",
     "desc": "Asiento contable",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "cxc": {
   "key": "cxc",
   "table": "cuentas_por_cobrar",
   "title": "Cuentas por cobrar",
   "icon": "trend",
   "desc": "Lo que los clientes deben por estimaciones y anticipos.",
   "group": null,
   "sub": "conta",
   "bi": null,
   "ex": [
    "Por cobrar",
    "Q 1.45 M"
   ],
   "kp": null,
   "cols": [
    {
     "k": "documento",
     "l": "Documento",
     "t": "c"
    },
    {
     "k": "cliente",
     "l": "Cliente",
     "t": "x"
    },
    {
     "k": "emision",
     "l": "Emisión",
     "t": "d"
    },
    {
     "k": "vence",
     "l": "Vence",
     "t": "d"
    },
    {
     "k": "saldo",
     "l": "Saldo",
     "t": "m"
    },
    {
     "k": "antiguedad",
     "l": "Antigüedad",
     "t": "g"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "cliente_id",
     "base": "FK",
     "en": null,
     "fk": "proveedores",
     "desc": "Cliente (entidad)",
     "nullable": false,
     "unique": false
    },
    {
     "k": "factura_emitida_id",
     "base": "FK",
     "en": null,
     "fk": "femi",
     "desc": "Factura que origina el cobro",
     "nullable": false,
     "unique": false
    },
    {
     "k": "proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Proyecto",
     "nullable": false,
     "unique": false
    },
    {
     "k": "estimacion_no",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Número de estimación",
     "nullable": true,
     "unique": false
    },
    {
     "k": "fecha_emision",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Emisión",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_vencimiento",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Vencimiento",
     "nullable": false,
     "unique": false
    },
    {
     "k": "monto_original",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Total facturado",
     "nullable": false,
     "unique": false
    },
    {
     "k": "retencion_garantia",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Retención del cliente (fondo de garantía)",
     "nullable": false,
     "unique": false
    },
    {
     "k": "monto_cobrado",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Cobros aplicados",
     "nullable": false,
     "unique": false
    },
    {
     "k": "dias_vencido",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Calculado diariamente",
     "nullable": false,
     "unique": false
    },
    {
     "k": "asiento_id",
     "base": "FK",
     "en": null,
     "fk": "contabilidad",
     "desc": "Asiento contable",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "eeff": {
   "key": "eeff",
   "table": "estados_financieros",
   "title": "Estados financieros",
   "icon": "scale",
   "desc": "Situación financiera y resultados bajo NIIF, comparados con el período anterior.",
   "group": null,
   "sub": "conta",
   "bi": null,
   "ex": [
    "Cuadre",
    "Activos = Pasivo + Patrimonio"
   ],
   "kp": [
    [
     "Activos totales",
     "Q 5.86 M"
    ],
    [
     "Pasivos",
     "Q 0.72 M"
    ],
    [
     "Utilidad antes de ISR",
     "Q 1.27 M"
    ]
   ],
   "cols": [
    {
     "k": "concepto",
     "l": "Concepto",
     "t": "x"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    },
    {
     "k": "actual",
     "l": "Actual",
     "t": "m"
    },
    {
     "k": "anterior",
     "l": "Anterior",
     "t": "m"
    },
    {
     "k": "norma",
     "l": "Norma",
     "t": "g"
    }
   ],
   "extras": [
    {
     "k": "periodo_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Período contable",
     "nullable": false,
     "unique": false
    },
    {
     "k": "tipo_estado",
     "base": "enum",
     "en": [
      "situacion_financiera",
      "resultados",
      "flujo_efectivo",
      "cambios_patrimonio"
     ],
     "fk": null,
     "desc": "Estado financiero",
     "nullable": false,
     "unique": false
    },
    {
     "k": "linea_codigo",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Código de la línea",
     "nullable": false,
     "unique": false
    },
    {
     "k": "cuentas_incluidas",
     "base": "json",
     "en": null,
     "fk": null,
     "desc": "Cuentas del plan que se agrupan",
     "nullable": false,
     "unique": false
    },
    {
     "k": "monto_actual",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Período actual",
     "nullable": false,
     "unique": false
    },
    {
     "k": "monto_anterior",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Período comparativo",
     "nullable": false,
     "unique": false
    },
    {
     "k": "norma_referencia",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "NIC/NIIF que la respalda",
     "nullable": false,
     "unique": false
    },
    {
     "k": "nota_explicativa",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Nota a los estados financieros",
     "nullable": true,
     "unique": false
    },
    {
     "k": "marco",
     "base": "enum",
     "en": [
      "niif_completas",
      "niif_pymes"
     ],
     "fk": null,
     "desc": "Marco contable",
     "nullable": false,
     "unique": false
    }
   ],
   "custom": false
  },
  "cierre": {
   "key": "cierre",
   "table": "cierres_periodo",
   "title": "Cierre de período",
   "icon": "lock",
   "desc": "Lista de control para cerrar cada mes sin dejar pendientes.",
   "group": null,
   "sub": "conta",
   "bi": null,
   "ex": [
    "Próximo cierre",
    "30 nov"
   ],
   "kp": null,
   "cols": [
    {
     "k": "periodo",
     "l": "Período",
     "t": "x"
    },
    {
     "k": "asientos",
     "l": "Asientos",
     "t": "n"
    },
    {
     "k": "conciliacion",
     "l": "Conciliación",
     "t": "g"
    },
    {
     "k": "depreciacion",
     "l": "Depreciación",
     "t": "g"
    },
    {
     "k": "provisiones",
     "l": "Provisiones",
     "t": "g"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "fecha_inicio",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Inicio",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_fin",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Fin",
     "nullable": false,
     "unique": false
    },
    {
     "k": "asientos_totales",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Asientos del período",
     "nullable": false,
     "unique": false
    },
    {
     "k": "conciliacion_bancaria_ok",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Bancos conciliados",
     "nullable": false,
     "unique": false
    },
    {
     "k": "depreciacion_ok",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Depreciación contabilizada",
     "nullable": false,
     "unique": false
    },
    {
     "k": "provisiones_ok",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Provisiones y ajustes",
     "nullable": false,
     "unique": false
    },
    {
     "k": "revision_ok",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Revisión del administrativo",
     "nullable": false,
     "unique": false
    },
    {
     "k": "cerrado_por",
     "base": "FK",
     "en": null,
     "fk": "usuarios",
     "desc": "Quien cerró",
     "nullable": true,
     "unique": false
    },
    {
     "k": "fecha_cierre",
     "base": "datetime",
     "en": null,
     "fk": null,
     "desc": "Momento del cierre",
     "nullable": true,
     "unique": false
    },
    {
     "k": "puede_reabrir",
     "base": "bool",
     "en": null,
     "fk": null,
     "desc": "Admite reapertura con justificación",
     "nullable": false,
     "unique": false
    },
    {
     "k": "motivo_reapertura",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Justificación",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "frec": {
   "key": "frec",
   "table": "facturas_recibidas",
   "title": "Facturas recibidas",
   "icon": "download",
   "desc": "Facturas FEL de proveedores, validadas contra la orden y la recepción.",
   "group": null,
   "sub": "fact",
   "bi": null,
   "ex": [
    "Crédito fiscal (mes)",
    "Q 96,400"
   ],
   "kp": null,
   "cols": [
    {
     "k": "factura",
     "l": "Factura",
     "t": "x"
    },
    {
     "k": "proveedor",
     "l": "Proveedor",
     "t": "t"
    },
    {
     "k": "fecha",
     "l": "Fecha",
     "t": "d"
    },
    {
     "k": "proyecto",
     "l": "Proyecto",
     "t": "c"
    },
    {
     "k": "subtotal",
     "l": "Subtotal",
     "t": "m"
    },
    {
     "k": "iva_12",
     "l": "IVA 12 %",
     "t": "m"
    },
    {
     "k": "total",
     "l": "Total",
     "t": "m"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "serie",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Serie de la factura",
     "nullable": false,
     "unique": false
    },
    {
     "k": "numero",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Número",
     "nullable": false,
     "unique": false
    },
    {
     "k": "uuid_fel",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Autorización FEL (SAT)",
     "nullable": false,
     "unique": true
    },
    {
     "k": "proveedor_id",
     "base": "FK",
     "en": null,
     "fk": "proveedores",
     "desc": "Emisor",
     "nullable": false,
     "unique": false
    },
    {
     "k": "compra_id",
     "base": "FK",
     "en": null,
     "fk": "compras",
     "desc": "Orden de compra relacionada",
     "nullable": true,
     "unique": false
    },
    {
     "k": "recepcion_id",
     "base": "FK",
     "en": null,
     "fk": "bodega",
     "desc": "Recepción en bodega (validación de 3 vías)",
     "nullable": true,
     "unique": false
    },
    {
     "k": "proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Proyecto",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_emision",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Fecha de emisión",
     "nullable": false,
     "unique": false
    },
    {
     "k": "moneda_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Moneda",
     "nullable": false,
     "unique": false
    },
    {
     "k": "iva",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "IVA 12 %",
     "nullable": false,
     "unique": false
    },
    {
     "k": "validacion_3_vias",
     "base": "enum",
     "en": [
      "pendiente",
      "coincide",
      "diferencia"
     ],
     "fk": null,
     "desc": "Orden = recepción = factura",
     "nullable": false,
     "unique": false
    },
    {
     "k": "diferencia_monto",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Diferencia detectada",
     "nullable": true,
     "unique": false
    },
    {
     "k": "motivo_rechazo",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Razón si se rechaza",
     "nullable": true,
     "unique": false
    },
    {
     "k": "pdf_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Respaldo",
     "nullable": true,
     "unique": false
    },
    {
     "k": "xml_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "XML certificado",
     "nullable": true,
     "unique": false
    },
    {
     "k": "registrado_por",
     "base": "FK",
     "en": null,
     "fk": "usuarios",
     "desc": "Quien la registró",
     "nullable": false,
     "unique": false
    },
    {
     "k": "asiento_id",
     "base": "FK",
     "en": null,
     "fk": "contabilidad",
     "desc": "Asiento generado",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "femi": {
   "key": "femi",
   "table": "facturas_emitidas",
   "title": "Facturas emitidas",
   "icon": "upload",
   "desc": "Facturas al cliente por estimaciones, anticipos y retenciones.",
   "group": null,
   "sub": "fact",
   "bi": null,
   "ex": [
    "Facturado en noviembre",
    "Q 1.2 M"
   ],
   "kp": null,
   "cols": [
    {
     "k": "factura",
     "l": "Factura",
     "t": "x"
    },
    {
     "k": "cliente",
     "l": "Cliente",
     "t": "t"
    },
    {
     "k": "fecha",
     "l": "Fecha",
     "t": "d"
    },
    {
     "k": "proyecto",
     "l": "Proyecto",
     "t": "c"
    },
    {
     "k": "concepto",
     "l": "Concepto",
     "t": "t"
    },
    {
     "k": "total",
     "l": "Total",
     "t": "m"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "serie",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Serie",
     "nullable": false,
     "unique": false
    },
    {
     "k": "numero",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Número",
     "nullable": false,
     "unique": false
    },
    {
     "k": "uuid_fel",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Autorización FEL",
     "nullable": true,
     "unique": true
    },
    {
     "k": "cliente_id",
     "base": "FK",
     "en": null,
     "fk": "proveedores",
     "desc": "Cliente",
     "nullable": false,
     "unique": false
    },
    {
     "k": "proyecto_id",
     "base": "FK",
     "en": null,
     "fk": "proyectos",
     "desc": "Proyecto",
     "nullable": false,
     "unique": false
    },
    {
     "k": "estimacion_no",
     "base": "int",
     "en": null,
     "fk": null,
     "desc": "Estimación",
     "nullable": true,
     "unique": false
    },
    {
     "k": "tipo",
     "base": "enum",
     "en": [
      "estimacion",
      "anticipo",
      "retencion",
      "otro"
     ],
     "fk": null,
     "desc": "Tipo de cobro",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_emision",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Fecha",
     "nullable": false,
     "unique": false
    },
    {
     "k": "porcentaje_avance",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Avance acumulado que respalda",
     "nullable": true,
     "unique": false
    },
    {
     "k": "moneda_id",
     "base": "FK",
     "en": null,
     "fk": "catalogos",
     "desc": "Moneda",
     "nullable": false,
     "unique": false
    },
    {
     "k": "subtotal",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Subtotal",
     "nullable": false,
     "unique": false
    },
    {
     "k": "iva",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "IVA 12 %",
     "nullable": false,
     "unique": false
    },
    {
     "k": "retencion_garantia",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Fondo de garantía",
     "nullable": false,
     "unique": false
    },
    {
     "k": "aprobacion_cliente_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Estimación firmada",
     "nullable": true,
     "unique": false
    },
    {
     "k": "emitido_por",
     "base": "FK",
     "en": null,
     "fk": "usuarios",
     "desc": "Quien emitió",
     "nullable": false,
     "unique": false
    },
    {
     "k": "asiento_id",
     "base": "FK",
     "en": null,
     "fk": "contabilidad",
     "desc": "Asiento (ingreso por grado de avance)",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "notas": {
   "key": "notas",
   "table": "notas_fiscales",
   "title": "Notas de crédito y débito",
   "icon": "edit",
   "desc": "Ajustes sobre facturas: devoluciones, descuentos y diferencias.",
   "group": null,
   "sub": "fact",
   "bi": null,
   "ex": [
    "Notas del mes",
    "5"
   ],
   "kp": null,
   "cols": [
    {
     "k": "nota",
     "l": "Nota",
     "t": "c"
    },
    {
     "k": "tipo",
     "l": "Tipo",
     "t": "g"
    },
    {
     "k": "factura",
     "l": "Factura",
     "t": "c"
    },
    {
     "k": "fecha",
     "l": "Fecha",
     "t": "d"
    },
    {
     "k": "motivo",
     "l": "Motivo",
     "t": "t"
    },
    {
     "k": "monto",
     "l": "Monto",
     "t": "m"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "serie",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Serie",
     "nullable": false,
     "unique": false
    },
    {
     "k": "numero",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Número",
     "nullable": false,
     "unique": false
    },
    {
     "k": "uuid_fel",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Autorización FEL",
     "nullable": true,
     "unique": true
    },
    {
     "k": "sentido",
     "base": "enum",
     "en": [
      "emitida",
      "recibida"
     ],
     "fk": null,
     "desc": "Si la emite la empresa o el proveedor",
     "nullable": false,
     "unique": false
    },
    {
     "k": "factura_origen_id",
     "base": "uuid",
     "en": null,
     "fk": null,
     "desc": "Factura original (emitida o recibida)",
     "nullable": false,
     "unique": false
    },
    {
     "k": "descripcion",
     "base": "text",
     "en": null,
     "fk": null,
     "desc": "Detalle",
     "nullable": true,
     "unique": false
    },
    {
     "k": "iva",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "IVA",
     "nullable": false,
     "unique": false
    },
    {
     "k": "total",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Total",
     "nullable": false,
     "unique": false
    },
    {
     "k": "asiento_id",
     "base": "FK",
     "en": null,
     "fk": "contabilidad",
     "desc": "Asiento generado",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "ret": {
   "key": "ret",
   "table": "retenciones",
   "title": "Retenciones IVA / ISR",
   "icon": "percent",
   "desc": "Retenciones practicadas al pagar y su declaración a la SAT.",
   "group": null,
   "sub": "fact",
   "bi": null,
   "ex": [
    "Por trasladar a SAT",
    "Q 1,679"
   ],
   "kp": null,
   "cols": [
    {
     "k": "constancia",
     "l": "Constancia",
     "t": "c"
    },
    {
     "k": "impuesto",
     "l": "Impuesto",
     "t": "g"
    },
    {
     "k": "proveedor",
     "l": "Proveedor",
     "t": "t"
    },
    {
     "k": "factura",
     "l": "Factura",
     "t": "c"
    },
    {
     "k": "base",
     "l": "Base",
     "t": "m"
    },
    {
     "k": "retenido",
     "l": "Retenido",
     "t": "m"
    },
    {
     "k": "periodo",
     "l": "Período",
     "t": "g"
    },
    {
     "k": "estado",
     "l": "Estado",
     "t": "s"
    }
   ],
   "extras": [
    {
     "k": "constancia_no",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Número de constancia",
     "nullable": false,
     "unique": true
    },
    {
     "k": "proveedor_id",
     "base": "FK",
     "en": null,
     "fk": "proveedores",
     "desc": "Sujeto retenido",
     "nullable": false,
     "unique": false
    },
    {
     "k": "factura_id",
     "base": "FK",
     "en": null,
     "fk": "frec",
     "desc": "Factura sobre la que se retiene",
     "nullable": false,
     "unique": false
    },
    {
     "k": "pago_id",
     "base": "FK",
     "en": null,
     "fk": "tesoreria",
     "desc": "Pago en el que se practicó",
     "nullable": true,
     "unique": false
    },
    {
     "k": "base_imponible",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Base de cálculo",
     "nullable": false,
     "unique": false
    },
    {
     "k": "porcentaje",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Porcentaje aplicado",
     "nullable": false,
     "unique": false
    },
    {
     "k": "monto_retenido",
     "base": "decimal",
     "en": null,
     "fk": null,
     "desc": "Monto retenido",
     "nullable": false,
     "unique": false
    },
    {
     "k": "fecha_declaracion",
     "base": "date",
     "en": null,
     "fk": null,
     "desc": "Cuando se declaró",
     "nullable": true,
     "unique": false
    },
    {
     "k": "constancia_url",
     "base": "string",
     "en": null,
     "fk": null,
     "desc": "Constancia emitida",
     "nullable": true,
     "unique": false
    },
    {
     "k": "asiento_id",
     "base": "FK",
     "en": null,
     "fk": "contabilidad",
     "desc": "Asiento generado",
     "nullable": true,
     "unique": false
    }
   ],
   "custom": false
  },
  "procesos": {
   "key": "procesos",
   "table": null,
   "title": "Procesos y capacitación",
   "icon": "flow",
   "desc": "Cada proceso paso a paso.",
   "group": "Guía",
   "sub": null,
   "bi": null,
   "ex": [
    "",
    ""
   ],
   "kp": null,
   "cols": [],
   "extras": [],
   "custom": true
  }
 },
 "nav": {
  "Guía": [
   "procesos"
  ],
  "Operación": [
   "proyectos",
   "bodegas",
   "bodega",
   "inventarios",
   "metas",
   "compras",
   "activos"
  ],
  "Personas": [
   "trabajadores",
   "departamentos",
   "usuarios",
   "roles"
  ],
  "Finanzas": [
   "proveedores",
   "tesoreria",
   "@conta",
   "@fact"
  ],
  "Datos": [
   "catalogos",
   "reportes",
   "migraciones"
  ]
 },
 "subs": {
  "conta": {
   "t": "Contabilidad NIIF",
   "i": "ledger",
   "k": [
    "plan",
    "contabilidad",
    "cxp",
    "cxc",
    "eeff",
    "cierre"
   ]
  },
  "fact": {
   "t": "Facturación",
   "i": "receipt",
   "k": [
    "frec",
    "femi",
    "notas",
    "ret"
   ]
  }
 },
 "acc": {
  "admin": [
   "usuarios",
   "roles",
   "catalogos",
   "proyectos",
   "proveedores",
   "trabajadores",
   "metas",
   "compras",
   "tesoreria",
   "reportes",
   "contabilidad",
   "activos",
   "migraciones",
   "departamentos",
   "inventarios",
   "bodega",
   "bodegas",
   "plan",
   "cxp",
   "cxc",
   "eeff",
   "cierre",
   "frec",
   "femi",
   "notas",
   "ret",
   "procesos"
  ],
  "maestro": [
   "procesos",
   "proyectos",
   "bodegas",
   "bodega",
   "inventarios",
   "metas",
   "compras",
   "activos",
   "trabajadores"
  ],
  "obrero": [
   "procesos",
   "bodega",
   "metas",
   "inventarios"
  ]
 },
 "prof": {
  "admin": {
   "n": "Luis Marroquín",
   "r": "Administrativo",
   "d": "Control total: compras, finanzas y datos."
  },
  "maestro": {
   "n": "Ana Cifuentes",
   "r": "Maestro de Obra",
   "d": "Obra, bodega y personal a cargo."
  },
  "obrero": {
   "n": "Carlos Tzoc",
   "r": "Obrero",
   "d": "Vista simple: pedir material y ver tareas."
  }
 },
 "email": {
  "admin": "luis@panoramic.gt",
  "maestro": "ana@panoramic.gt",
  "obrero": "carlos@panoramic.gt"
 },
 "why": {
  "usuarios": "Cada persona entra con su propia cuenta para que toda acción quede a su nombre. Sin eso no hay trazabilidad: nadie sabe quién aprobó qué.",
  "roles": "Define qué puede ver y hacer cada perfil. Un obrero no necesita ver costos y un contador no necesita aprobar despachos. Menos accesos, menos errores y fraudes.",
  "catalogos": "Una sola lista de unidades, monedas y categorías evita que \"saco\", \"SACO\" y \"Sacos\" sean cosas distintas, y permite sumar y comparar.",
  "proyectos": "Todo el dinero, material y personal se imputa a un proyecto. Es la unidad con la que se mide si una obra gana o pierde dinero.",
  "bodegas": "Cada proyecto tiene su(s) bodega(s) y su propio inventario. Así el costo del material cae en la obra que lo usa y se sabe quién tiene qué, sin mezclar obras.",
  "inventarios": "Dice cuánto material hay en cada bodega y a qué costo. Evita paros por falta de material y compras duplicadas, y es la base del costo de obra.",
  "bodega": "Cada entrada, salida o traslado deja un vale. Es el respaldo del costo cargado a la obra y la forma de detectar mermas y pérdidas.",
  "proveedores": "Un padrón único con NIT, crédito y calificación permite comparar precios, validar facturas y pagar a tiempo.",
  "trabajadores": "Es la base de la planilla, la asistencia y la seguridad social. Sin ficha completa (DPI, IGSS, contrato) no se puede pagar ni cumplir con la ley.",
  "metas": "Convierte el avance de obra en hitos medibles con responsable y fecha. Permite ver atrasos a tiempo y sustenta el avance que se cobra al cliente.",
  "compras": "Ordena el gasto antes de que ocurra: se pide, se compara, se aprueba y recién entonces se compra. Separa quien solicita de quien autoriza.",
  "activos": "La maquinaria es una inversión grande que pierde valor cada mes. Registrarla permite depreciarla, programar mantenimiento y cargarla a cada obra.",
  "departamentos": "Son los centros de costo: permiten saber cuánto gasta cada área frente a su presupuesto.",
  "tesoreria": "Muestra el dinero real: lo que entra y sale de bancos y caja. Conciliar contra el banco evita sorpresas de liquidez.",
  "reportes": "Entrega a cada nivel de mando la información que necesita sin pedirla a mano: gerencia ve avance y caja, bodega ve stock crítico.",
  "migraciones": "Lleva datos desde Excel o sistemas antiguos al formato estándar, limpiando duplicados y errores, para arrancar con información confiable.",
  "plan": "Es el \"idioma\" de la contabilidad: cada hecho económico se registra en una cuenta con su naturaleza y su norma. Con un plan ordenado, los estados financieros salen solos.",
  "contabilidad": "El libro diario registra cada hecho económico con partida doble (Debe = Haber). Es el respaldo legal y la fuente de los estados financieros.",
  "cxp": "Controla lo que se debe a proveedores y cuándo vence. Pagar a tiempo mantiene el crédito y aprovecha descuentos. Es un pasivo que aparece en el balance.",
  "cxc": "Controla lo que los clientes deben por estimaciones facturadas. Sin seguimiento, la obra termina financiándose con dinero propio.",
  "eeff": "Resume la salud financiera en los estados que exige NIIF: situación financiera, resultados y flujo de efectivo. Es lo que leen gerencia, bancos y auditores.",
  "cierre": "Cerrar el período bloquea cambios y garantiza que lo ya reportado no se altere. Se hace después de conciliar, depreciar y provisionar.",
  "frec": "La factura del proveedor (FEL) es el documento legal que respalda el gasto y el crédito fiscal del IVA. Se valida contra la orden de compra y la recepción (\"3 vías\").",
  "femi": "Con la factura de la estimación se cobra al cliente y se reconoce el ingreso según el avance real de la obra.",
  "notas": "Corrigen facturas ya emitidas (devoluciones, descuentos, diferencias) sin alterar el documento original.",
  "ret": "Cuando la ley lo exige, se retiene IVA o ISR al pagar y se traslada a la SAT. Registrarlo a tiempo evita multas y diferencias en la declaración.",
  "procesos": "Muestra cada proceso de principio a fin y quién interviene, para que cualquiera entienda su parte, a quién reporta y por qué importa."
 },
 "norm": {
  "inventarios": "NIC 2 · NIIF PYMES Sec. 13 (inventarios al costo)",
  "activos": "NIC 16 · NIIF PYMES Sec. 17 (propiedad, planta y equipo)",
  "tesoreria": "NIC 7 · NIIF PYMES Sec. 7 (flujo de efectivo)",
  "plan": "NIC 1 · NIIF PYMES Sec. 4 (presentación de estados financieros)",
  "contabilidad": "Marco conceptual NIIF: base de acumulación (devengo) y partida doble",
  "cxp": "NIIF 9 · NIIF PYMES Sec. 11 (pasivos financieros)",
  "cxc": "NIIF 9 · Sec. 11 y NIIF 15 · Sec. 23",
  "eeff": "NIC 1 · NIC 7 · NIIF PYMES Sec. 3 a 7",
  "cierre": "NIC 8 · NIIF PYMES Sec. 10 (período, políticas y errores)",
  "frec": "Ley del IVA y facturación electrónica FEL (SAT, Guatemala)",
  "femi": "NIIF 15 · NIIF PYMES Sec. 23 (ingresos) y FEL",
  "notas": "Ley del IVA y FEL (notas de crédito y débito)",
  "ret": "Ley del IVA e ISR: retenciones a trasladar a la SAT"
 },
 "flows": {
  "compra": {
   "t": "De la necesidad al pago",
   "i": "cart",
   "d": "Cómo se compra un material, cómo se recibe y cómo se paga con su factura.",
   "steps": [
    {
     "t": "Requisición",
     "a": "Maestro de Obra",
     "m": "compras",
     "w": "El maestro conoce lo que realmente falta en la obra. Registrarlo evita compras \"de palabra\" y deja claro quién pidió qué y para qué proyecto.",
     "d": "Requisición de material"
    },
    {
     "t": "Cotización",
     "a": "Compras",
     "m": "proveedores",
     "w": "Comparar al menos tres proveedores protege el precio y deja evidencia de que se eligió la mejor oferta.",
     "d": "Cuadro comparativo"
    },
    {
     "t": "Aprobación de la orden",
     "a": "Administrativo",
     "m": "compras",
     "w": "Quien pide no aprueba. Separar funciones reduce errores y fraudes; el monto define qué nivel de mando autoriza.",
     "d": "Orden de compra (OC) aprobada"
    },
    {
     "t": "Recepción en bodega",
     "a": "Bodeguero",
     "m": "bodega",
     "w": "Se verifica que lo recibido coincida con la OC antes de aceptarlo. Aquí nace el inventario del proyecto.",
     "d": "Vale de entrada",
     "x": [
      [
       "1105 Inventarios",
       43303.57,
       null
      ],
      [
       "2102 Mercadería recibida por facturar",
       null,
       43303.57
      ]
     ],
     "n": "NIC 2 · Sec. 13: el inventario se mide al costo."
    },
    {
     "t": "Registro de la factura",
     "a": "Contador",
     "m": "frec",
     "w": "La factura FEL es el documento legal del gasto y del crédito fiscal. Se valida contra la OC y la recepción (\"3 vías\"): si no coinciden, no se paga.",
     "d": "Factura FEL validada",
     "x": [
      [
       "2102 Mercadería por facturar",
       43303.57,
       null
      ],
      [
       "1108 IVA crédito fiscal",
       5196.43,
       null
      ],
      [
       "2101 Proveedores",
       null,
       48500
      ]
     ],
     "n": "Pasivo financiero reconocido al recibir la factura."
    },
    {
     "t": "Cuenta por pagar",
     "a": "Contador",
     "m": "cxp",
     "w": "Se programa según el crédito pactado (por ejemplo 30 días). Pagar a tiempo mantiene el crédito y evita recargos.",
     "d": "Programación de pagos",
     "n": "NIIF 9 · Sec. 11: pasivos financieros."
    },
    {
     "t": "Pago y retenciones",
     "a": "Administrativo",
     "m": "tesoreria",
     "w": "Se paga solo lo aprobado y se retiene IVA/ISR cuando la ley lo exige. En pagos grandes firman dos personas.",
     "d": "Transferencia y constancia de retención",
     "x": [
      [
       "2101 Proveedores",
       48500,
       null
      ],
      [
       "1101 Bancos",
       null,
       47720.54
      ],
      [
       "2112 Retención IVA por pagar",
       null,
       779.46
      ]
     ]
    },
    {
     "t": "Conciliación y asiento",
     "a": "Contador",
     "m": "contabilidad",
     "w": "Se compara el banco con los libros. Lo que no cuadra se investiga antes de cerrar el mes.",
     "d": "Asiento de diario conciliado"
    }
   ]
  },
  "material": {
   "t": "Solicitud y despacho de material",
   "i": "warehouse",
   "d": "Desde que un obrero necesita material hasta que el costo llega a la obra.",
   "steps": [
    {
     "t": "Solicitud",
     "a": "Obrero",
     "m": "bodega",
     "w": "Quien trabaja sabe qué necesita. Pedirlo en el sistema evita viajes a la bodega sin saber si hay material.",
     "d": "Solicitud de material"
    },
    {
     "t": "Autorización",
     "a": "Maestro de Obra",
     "m": "bodega",
     "w": "El maestro valida que la cantidad corresponda al avance real y al presupuesto de la obra.",
     "d": "Solicitud autorizada"
    },
    {
     "t": "Despacho",
     "a": "Bodeguero",
     "m": "bodega",
     "w": "Se entrega contra un vale firmado. Sin firma no hay respaldo si después falta material.",
     "d": "Vale de salida firmado"
    },
    {
     "t": "Descuento de inventario",
     "a": "Sistema",
     "m": "inventarios",
     "w": "El stock de esa bodega baja al instante, al costo promedio. Si llega al mínimo, se genera una alerta.",
     "d": "Kardex actualizado"
    },
    {
     "t": "Costo a la obra",
     "a": "Contador",
     "m": "contabilidad",
     "w": "Lo que se usó se convierte en costo del proyecto. Así se sabe cuánto cuesta de verdad cada obra.",
     "d": "Asiento de costo",
     "x": [
      [
       "5101 Costo de obra",
       3700,
       null
      ],
      [
       "1105 Inventarios",
       null,
       3700
      ]
     ],
     "n": "NIIF PYMES Sec. 13: el inventario consumido pasa a costo."
    },
    {
     "t": "Alerta de stock mínimo",
     "a": "Sistema",
     "m": "compras",
     "w": "Cuando el stock cae bajo el mínimo se sugiere una requisición y el ciclo de compra vuelve a empezar.",
     "d": "Requisición sugerida"
    }
   ]
  },
  "traslado": {
   "t": "Traslado entre bodegas",
   "i": "migrate",
   "d": "Mover material de la bodega de un proyecto a la de otro, sin perder el rastro del costo.",
   "steps": [
    {
     "t": "Solicitud de traslado",
     "a": "Maestro de Obra",
     "m": "bodega",
     "w": "Una obra puede tener material que otra necesita. Trasladar evita comprar de más.",
     "d": "Solicitud de traslado"
    },
    {
     "t": "Revisión del residente",
     "a": "Residente",
     "m": "proyectos",
     "w": "Confirma que el traslado no deja a la obra de origen sin material crítico.",
     "d": "Visto bueno"
    },
    {
     "t": "Aprobación administrativa",
     "a": "Administrativo",
     "m": "bodega",
     "w": "Mover material entre proyectos cambia el costo de ambas obras, por eso lo autoriza un nivel superior.",
     "d": "Traslado autorizado"
    },
    {
     "t": "Salida de bodega origen",
     "a": "Bodeguero",
     "m": "bodega",
     "w": "La bodega de origen entrega y firma. El material queda \"en tránsito\" hasta que llegue.",
     "d": "Vale de traslado"
    },
    {
     "t": "Recepción en destino",
     "a": "Bodeguero",
     "m": "bodega",
     "w": "La bodega destino confirma las cantidades. Si hay diferencia, se registra como ajuste y se investiga.",
     "d": "Vale de recepción"
    },
    {
     "t": "Costo entre proyectos",
     "a": "Contador",
     "m": "contabilidad",
     "w": "El costo sale de un proyecto y entra en el otro sin afectar el resultado total de la empresa.",
     "d": "Asiento de traslado",
     "x": [
      [
       "1105 Inventarios · Vista Hermosa",
       640,
       null
      ],
      [
       "1105 Inventarios · Torre Z10",
       null,
       640
      ]
     ]
    }
   ]
  },
  "cobro": {
   "t": "De la estimación al cobro",
   "i": "trend",
   "d": "Cómo se mide el avance, se factura al cliente y se cobra.",
   "steps": [
    {
     "t": "Medición de avance",
     "a": "Maestro de Obra",
     "m": "metas",
     "w": "El avance medido en campo es la base para cobrar. Se respalda con mediciones y fotografías.",
     "d": "Informe de avance"
    },
    {
     "t": "Estimación aprobada",
     "a": "Residente",
     "m": "proyectos",
     "w": "El cliente y el residente validan lo ejecutado antes de facturar, para evitar discusiones después.",
     "d": "Estimación firmada"
    },
    {
     "t": "Factura al cliente",
     "a": "Contador",
     "m": "femi",
     "w": "Se emite la factura electrónica (FEL) por lo aprobado. Sin factura no hay cobro ni ingreso legal.",
     "d": "Factura FEL",
     "x": [
      [
       "1103 Cuentas por cobrar",
       540000,
       null
      ],
      [
       "4101 Ingresos por contratos",
       null,
       482142.86
      ],
      [
       "2110 IVA por pagar",
       null,
       57857.14
      ]
     ],
     "n": "NIIF 15 · Sec. 23: el ingreso se reconoce según el avance de la obra."
    },
    {
     "t": "Cuenta por cobrar",
     "a": "Contador",
     "m": "cxc",
     "w": "El seguimiento de vencimientos permite cobrar a tiempo. Una obra no debe financiarse sola.",
     "d": "Estado de cuenta del cliente"
    },
    {
     "t": "Cobro",
     "a": "Administrativo",
     "m": "tesoreria",
     "w": "El dinero entra al banco y se aplica a la factura correspondiente.",
     "d": "Boleta de depósito",
     "x": [
      [
       "1101 Bancos",
       540000,
       null
      ],
      [
       "1103 Cuentas por cobrar",
       null,
       540000
      ]
     ]
    },
    {
     "t": "Conciliación",
     "a": "Contador",
     "m": "contabilidad",
     "w": "Se verifica que lo cobrado coincida con el banco antes de cerrar el período.",
     "d": "Asiento conciliado"
    }
   ]
  },
  "planilla": {
   "t": "Planilla semanal",
   "i": "hardhat",
   "d": "Del registro de asistencia al pago y la carga por proyecto.",
   "steps": [
    {
     "t": "Asistencia",
     "a": "Maestro de Obra",
     "m": "trabajadores",
     "w": "Registrar los días trabajados por proyecto permite pagar lo justo y cargar la mano de obra a cada obra.",
     "d": "Reporte de asistencia"
    },
    {
     "t": "Cálculo de planilla",
     "a": "Administrativo",
     "m": "trabajadores",
     "w": "Se calculan salarios, bonificación y descuentos de ley (IGSS). Es un proceso mecánico que no debe hacerse a mano.",
     "d": "Planilla calculada"
    },
    {
     "t": "Aprobación",
     "a": "Gerencia",
     "m": "tesoreria",
     "w": "Un nivel superior autoriza el desembolso. Revisa totales y cambios inusuales.",
     "d": "Planilla aprobada"
    },
    {
     "t": "Pago",
     "a": "Administrativo",
     "m": "tesoreria",
     "w": "El pago por transferencia deja respaldo y evita manejar efectivo en obra.",
     "d": "Transferencias",
     "x": [
      [
       "2105 Sueldos por pagar",
       31200,
       null
      ],
      [
       "1101 Bancos",
       null,
       31200
      ]
     ]
    },
    {
     "t": "IGSS e impuestos",
     "a": "Contador",
     "m": "ret",
     "w": "Las cuotas y retenciones se pagan a cada entidad en su fecha límite.",
     "d": "Constancias de pago"
    },
    {
     "t": "Costo por proyecto",
     "a": "Contador",
     "m": "contabilidad",
     "w": "La mano de obra se asigna a cada proyecto según la asistencia.",
     "d": "Asiento de planilla",
     "x": [
      [
       "5101 Costo de obra",
       31200,
       null
      ],
      [
       "2105 Sueldos por pagar",
       null,
       31200
      ]
     ]
    }
   ]
  },
  "cierre": {
   "t": "Cierre contable mensual",
   "i": "lock",
   "d": "Lista de control para cerrar el mes con información confiable.",
   "steps": [
    {
     "t": "Conciliación bancaria",
     "a": "Contador",
     "m": "tesoreria",
     "w": "Compara el banco con los libros. Las diferencias se explican antes de seguir.",
     "d": "Conciliación firmada"
    },
    {
     "t": "Depreciación de activos",
     "a": "Contador",
     "m": "activos",
     "w": "La maquinaria pierde valor cada mes; ese desgaste es un gasto real aunque no salga dinero.",
     "d": "Cuadro de depreciación",
     "x": [
      [
       "6102 Depreciación del ejercicio",
       14820,
       null
      ],
      [
       "1299 Depreciación acumulada",
       null,
       14820
      ]
     ],
     "n": "NIC 16 · Sec. 17."
    },
    {
     "t": "Provisiones y ajustes",
     "a": "Contador",
     "m": "contabilidad",
     "w": "Se reconocen gastos ya incurridos aunque todavía no estén facturados (base de acumulación).",
     "d": "Asientos de ajuste",
     "n": "Marco conceptual NIIF: devengo."
    },
    {
     "t": "Revisión de asientos",
     "a": "Administrativo",
     "m": "contabilidad",
     "w": "Una segunda persona revisa. Los errores detectados ahora no llegan a los estados financieros.",
     "d": "Libro diario revisado"
    },
    {
     "t": "Cierre del período",
     "a": "Administrativo",
     "m": "cierre",
     "w": "Cerrar bloquea cambios: lo ya reportado no se puede alterar sin justificación.",
     "d": "Período cerrado"
    },
    {
     "t": "Estados financieros",
     "a": "Gerencia",
     "m": "eeff",
     "w": "Con el período cerrado se emiten los estados que leen gerencia, bancos y auditores.",
     "d": "Estados financieros NIIF",
     "n": "NIC 1 · NIIF PYMES Sec. 3 a 7."
    }
   ]
  },
  "migra": {
   "t": "Migración de datos",
   "i": "db",
   "d": "Cómo llevar información de Excel o sistemas antiguos al formato estándar.",
   "steps": [
    {
     "t": "Origen",
     "a": "Administrativo",
     "m": "migraciones",
     "w": "Se elige la fuente (Excel, CSV o base legacy) y se guarda un respaldo del archivo original.",
     "d": "Archivo de origen"
    },
    {
     "t": "Mapeo de columnas",
     "a": "Administrativo",
     "m": "migraciones",
     "w": "Cada columna antigua se asigna a un campo estándar. Se guarda como plantilla para la próxima carga.",
     "d": "Plantilla de mapeo"
    },
    {
     "t": "Validación",
     "a": "Administrativo",
     "m": "migraciones",
     "w": "Se detectan duplicados, vacíos y formatos incorrectos antes de tocar los datos reales.",
     "d": "Reporte de errores"
    },
    {
     "t": "Importación",
     "a": "Sistema",
     "m": "migraciones",
     "w": "Se cargan solo los datos válidos, en un lote identificable que puede revertirse.",
     "d": "Lote de importación"
    },
    {
     "t": "Verificación",
     "a": "Administrativo",
     "m": "inventarios",
     "w": "Se comparan totales contra el origen. Si algo no cuadra, se revierte el lote completo.",
     "d": "Acta de verificación"
    }
   ]
  }
 },
 "niv": {
  "Gerencia": 1,
  "Administrativo": 2,
  "Compras": 3,
  "Contador": 3,
  "Residente": 3,
  "Maestro de Obra": 4,
  "Bodeguero": 5,
  "Obrero": 5,
  "Sistema": 0
 },
 "mirol": {
  "admin": [
   "Administrativo",
   "Compras",
   "Contador",
   "Gerencia"
  ],
  "maestro": [
   "Maestro de Obra",
   "Residente"
  ],
  "obrero": [
   "Obrero"
  ]
 },
 "cmd": [
  [
   "Gerencia",
   1,
   "Define presupuestos y aprueba lo mayor.",
   "Fija el rumbo de la empresa y firma los pagos y compras grandes.",
   "Junta / Dueños",
   "Reportes · Estados financieros",
   "users"
  ],
  [
   "Administrativo",
   2,
   "Controla compras, pagos y cierres.",
   "Aprueba traslados y órdenes medianas. Supervisa a contabilidad y compras.",
   "Gerencia",
   "Todos los módulos",
   "shield"
  ],
  [
   "Residente · Contador · Compras",
   3,
   "Operan su área especializada.",
   "Residente valida estimaciones; contador registra y concilia; compras cotiza.",
   "Administrativo",
   "Proyectos · Contabilidad · Compras",
   "building"
  ],
  [
   "Maestro de Obra",
   4,
   "Dirige la obra en campo.",
   "Autoriza despachos, mide avance y pide materiales para su proyecto.",
   "Residente",
   "Bodega · Metas · Inventarios · Compras",
   "hardhat"
  ],
  [
   "Obrero · Bodeguero",
   5,
   "Ejecutan y registran.",
   "El obrero solicita material y marca tareas; el bodeguero entrega, recibe y firma vales.",
   "Maestro de Obra",
   "Solicitudes · Bodega",
   "hand"
  ]
 ],
 "matriz": [
  [
   "Pedir material de bodega",
   "Obrero",
   "Maestro de Obra",
   "Maestro de Obra",
   "Hasta el stock disponible"
  ],
  [
   "Traslado entre bodegas",
   "Maestro de Obra",
   "Residente",
   "Administrativo",
   "Siempre"
  ],
  [
   "Requisición de compra",
   "Maestro de Obra",
   "Residente",
   "Compras",
   "Hasta Q 25,000"
  ],
  [
   "Orden de compra",
   "Compras",
   "Administrativo",
   "Administrativo",
   "Q 25,001 a Q 100,000"
  ],
  [
   "Orden de compra mayor",
   "Compras",
   "Administrativo",
   "Gerencia",
   "Más de Q 100,000"
  ],
  [
   "Pago a proveedor",
   "Contador",
   "Administrativo",
   "Gerencia",
   "Más de Q 100,000 (dos firmas)"
  ],
  [
   "Estimación al cliente",
   "Maestro de Obra",
   "Residente",
   "Administrativo",
   "Cada estimación"
  ],
  [
   "Ajuste de inventario",
   "Bodeguero",
   "Maestro de Obra",
   "Administrativo",
   "Cualquier diferencia"
  ],
  [
   "Cierre de período",
   "Contador",
   "Administrativo",
   "Gerencia",
   "Mensual"
  ]
 ],
 "bod": [
  "Torre Z10",
  "Los Cedros",
  "C.C. Escuintla",
  "Puente Michatoya",
  "Vista Hermosa"
 ],
 "binfo": {
  "Torre Z10": [
   "BOD-001",
   "PRY-001",
   "Julio Pérez"
  ],
  "Los Cedros": [
   "BOD-002",
   "PRY-002",
   "Esteban Coy"
  ],
  "C.C. Escuintla": [
   "BOD-003",
   "PRY-004",
   "Jorge Sac"
  ],
  "Puente Michatoya": [
   "BOD-004",
   "PRY-005",
   "Héctor Ixcoy"
  ],
  "Vista Hermosa": [
   "BOD-005",
   "PRY-007",
   "Héctor Ixcoy"
  ]
 }
};
