/* Panoramic · datos 2: bodegas por proyecto, contabilidad NIIF, facturación, procesos y "por qué" */

/* ---------- Bodegas por proyecto e inventario del proyecto ---------- */
const BOD=['Torre Z10','Los Cedros','C.C. Escuintla','Puente Michatoya','Vista Hermosa'];
const BINFO={'Torre Z10':['BOD-001','PRY-001','Julio Pérez'],'Los Cedros':['BOD-002','PRY-002','Esteban Coy'],'C.C. Escuintla':['BOD-003','PRY-004','Jorge Sac'],'Puente Michatoya':['BOD-004','PRY-005','Héctor Ixcoy'],'Vista Hermosa':['BOD-005','PRY-007','Héctor Ixcoy']};

Object.assign(M,{
inventarios:{i:'box',t:'Inventarios',g:'Operación',d:'Existencias por proyecto y bodega. El mismo material puede estar en varias obras, cada una con su stock y su costo.',bi:3,
 c:[['Material','x'],['Categoría','g'],['Proyecto','c'],['Bodega','t'],['Existencia','k'],['Unidad','t'],['Costo prom.','m'],['Estado','s']],
 r:[['Cemento 42.5 kg|MAT-0012','Cementos','PRY-001','Torre Z10','340/120','Saco',92.5,'Activo'],
 ['Varilla 3/8"|MAT-0045','Aceros','PRY-001','Torre Z10','28/80','Varilla',48.75,'Bajo stock'],
 ['Cable THHN #12|MAT-0212','Eléctrico','PRY-001','Torre Z10','180/200','Rollo',640,'Bajo stock'],
 ['Cemento 42.5 kg|MAT-0012','Cementos','PRY-002','Los Cedros','210/100','Saco',93.2,'Activo'],
 ['Block 15x20x40|MAT-0101','Mampostería','PRY-002','Los Cedros','4200/1500','Unidad',5.2,'Activo'],
 ['Varilla 3/8"|MAT-0045','Aceros','PRY-004','C.C. Escuintla','420/150','Varilla',47.9,'Activo'],
 ['Block 15x20x40|MAT-0101','Mampostería','PRY-004','C.C. Escuintla','1800/1000','Unidad',5.35,'Activo'],
 ['Arena de río|MAT-0150','Agregados','PRY-005','Puente Michatoya','62/30','m³',185,'Activo'],
 ['Piedrín 3/4"|MAT-0155','Agregados','PRY-005','Puente Michatoya','120/40','m³',220,'Activo'],
 ['Cemento 42.5 kg|MAT-0012','Cementos','PRY-007','Vista Hermosa','95/80','Saco',92.8,'Activo'],
 ['Tubo PVC 4"|MAT-0230','Plomería','PRY-007','Vista Hermosa','96/40','Tubo',78,'Activo'],
 ['Pintura látex blanca|MAT-0310','Acabados','PRY-007','Vista Hermosa','45/50','Cubeta',410,'Bajo stock']],
 ex:['Valor en bodegas','Q 1.6 M'],
 f:'sku:string INDEX # Código del material (puede repetirse entre proyectos)|proyecto_id:FK proyectos # Proyecto dueño del inventario|bodega_id:FK bodegas # Bodega donde está físicamente|codigo_barras:string NULL # EAN / QR|descripcion:string # Nombre del material|especificacion:text NULL # Ficha técnica|categoria_id:FK catalogos # Categoría|unidad_id:FK catalogos # Unidad de medida|proveedor_habitual_id:FK proveedores NULL # Proveedor sugerido|ubicacion_fisica:string NULL # Pasillo / estante|stock_actual:decimal # Existencia en esta bodega|stock_reservado:decimal # Comprometido en solicitudes aprobadas|stock_minimo:decimal # Punto de reorden|stock_maximo:decimal NULL # Tope recomendado|costo_promedio:decimal # Costo promedio ponderado en esta bodega|ultimo_costo:decimal # Última compra|moneda_id:FK catalogos # Moneda del costo|lleva_lote:bool # Controla lotes/vencimiento|imagen_url:string NULL # Foto|activo:bool # Disponible'},

bodega:{i:'warehouse',t:'Movimientos de bodega',g:'Operación',d:'Entradas, salidas y traslados. Elige una bodega para ver solo sus movimientos.',bi:4,
 c:[['Fecha','d'],['Movimiento','g'],['Material','t'],['Cantidad','n'],['Bodega','t'],['Proyecto','c'],['Solicitó','p'],['Estado','s']],
 r:[['21 nov','Salida','Block 15x20x40',500,'Los Cedros','PRY-002','Esteban Coy','Pendiente'],
 ['20 nov','Salida','Cemento 42.5 kg',40,'Torre Z10','PRY-001','Carlos Tzoc','Autorizado'],
 ['20 nov','Entrada','Varilla 3/8"',200,'C.C. Escuintla','PRY-004','Julio Pérez','Autorizado'],
 ['20 nov','Traslado','Cable THHN #12',6,'Torre Z10 → Los Cedros','PRY-001','Jorge Sac','Autorizado'],
 ['19 nov','Salida','Arena de río',12,'Puente Michatoya','PRY-005','Héctor Ixcoy','Autorizado'],
 ['19 nov','Entrada','Cemento 42.5 kg',400,'Torre Z10','PRY-001','Julio Pérez','Autorizado'],
 ['18 nov','Salida','Pintura látex blanca',8,'Vista Hermosa','PRY-007','Esteban Coy','Rechazado'],
 ['18 nov','Entrada','Tubo PVC 4"',60,'Vista Hermosa','PRY-007','Julio Pérez','Autorizado'],
 ['17 nov','Salida','Piedrín 3/4"',15,'Puente Michatoya','PRY-005','Héctor Ixcoy','Autorizado'],
 ['17 nov','Traslado','Varilla 3/8"',50,'C.C. Escuintla → Torre Z10','PRY-004','Jorge Sac','Pendiente'],
 ['16 nov','Entrada','Block 15x20x40',2000,'Los Cedros','PRY-002','Julio Pérez','Autorizado'],
 ['16 nov','Salida','Cemento 42.5 kg',60,'Los Cedros','PRY-002','Esteban Coy','Autorizado']],
 ex:['Movimientos hoy','4'],
 f:'numero_documento:string UNIQUE # Correlativo del vale|tipo:enum(entrada,salida,traslado,ajuste) # Tipo de movimiento|bodega_origen_id:FK bodegas # Bodega que entrega o recibe|bodega_destino_id:FK bodegas NULL # Destino (solo traslados)|proyecto_id:FK proyectos # Proyecto al que se carga el costo|inventario_id:FK inventarios # Material en esa bodega|cantidad:decimal # Cantidad|costo_unitario:decimal # Costo promedio al momento del movimiento|lote:string NULL # Lote|fecha:datetime # Fecha y hora|compra_id:FK compras NULL # Orden de compra (entradas)|solicitud_id:FK bodega NULL # Solicitud que originó el despacho|solicitado_por:FK trabajadores # Quien pide|entregado_a:FK trabajadores NULL # Quien recibe|autorizado_por:FK usuarios NULL # Quien autoriza|fecha_autorizacion:datetime NULL # Momento de autorización|motivo_ajuste:text NULL # Para ajustes de inventario|firma_url:string NULL # Firma de recepción|estado:enum(pendiente,autorizado,rechazado,anulado) # Estado'}
});
const bodStats=n=>{const inv=M.inventarios.r.filter(r=>r[3]==n);return{items:inv.length,val:inv.reduce((s,r)=>s+parseFloat(r[4])*r[6],0),mov:M.bodega.r.filter(r=>String(r[4]).includes(n)).length}};
M.bodegas={i:'warehouse',t:'Bodegas',g:'Operación',d:'Cada proyecto tiene sus bodegas. Aquí se administran y se comparan.',
 c:[['Bodega','x'],['Proyecto','c'],['Responsable','p'],['Ítems','n'],['Valor inventario','m'],['Mov. (mes)','n'],['Estado','s']],
 r:BOD.map(n=>{const s=bodStats(n);return [n+'|'+BINFO[n][0],BINFO[n][1],BINFO[n][2],s.items,Math.round(s.val),s.mov,'Activo']}),
 ex:['Bodegas activas','5'],
 f:'codigo:string UNIQUE # Código (BOD-001)|nombre:string # Nombre visible|proyecto_id:FK proyectos # Proyecto al que pertenece (obligatorio)|tipo:enum(principal,satelite,patio,transito) # Tipo de bodega|responsable_id:FK trabajadores # Bodeguero a cargo|direccion:text NULL # Ubicación dentro de la obra|capacidad_m2:decimal NULL # Superficie|permite_traslados:bool # Puede enviar/recibir de otras obras|requiere_autorizacion_salida:bool # Toda salida necesita autorización|valor_inventario:decimal # Valor calculado (existencias × costo)|fecha_apertura:date # Apertura|fecha_cierre:date NULL # Se cierra al terminar la obra|estado:enum(activa,inactiva,cerrada) # Estado'};

/* ---------- Contabilidad NIIF ---------- */
Object.assign(M,{
plan:{i:'table',t:'Plan de cuentas',d:'Catálogo de cuentas contables y la norma que respalda a cada una.',
 c:[['Código','c'],['Cuenta','x'],['Tipo','g'],['Nivel','n'],['Norma','g'],['Saldo','m'],['Estado','s']],
 r:[['1101','Caja y bancos|Deudora','Activo corriente',3,'NIC 7 · Sec. 7',1840000,'Activo'],['1103','Cuentas por cobrar clientes|Deudora','Activo corriente',3,'NIIF 9 · Sec. 11',920000,'Activo'],['1105','Inventarios|Deudora','Activo corriente',3,'NIC 2 · Sec. 13',1200000,'Activo'],['1108','IVA crédito fiscal|Deudora','Activo corriente',3,'Ley del IVA',96400,'Activo'],['1201','Maquinaria y equipo|Deudora','Activo no corriente',3,'NIC 16 · Sec. 17',3025000,'Activo'],['1299','Depreciación acumulada|Acreedora','Activo no corriente',3,'NIC 16 · Sec. 17',-1125000,'Activo'],['2101','Proveedores|Acreedora','Pasivo corriente',3,'NIIF 9 · Sec. 11',640000,'Activo'],['2110','IVA por pagar|Acreedora','Pasivo corriente',3,'Ley del IVA',84500,'Activo'],['3101','Capital social|Acreedora','Patrimonio',3,'Sec. 22',2500000,'Activo'],['4101','Ingresos por contratos|Acreedora','Ingresos',3,'NIIF 15 · Sec. 23',9800000,'Activo'],['5101','Costo de obra|Deudora','Costos',3,'NIIF 15 · Sec. 23',7350000,'Activo'],['6102','Depreciación del ejercicio|Deudora','Gastos',3,'NIC 16 · Sec. 17',148200,'Activo']],
 ex:['Cuentas activas','142'],
 f:'codigo:string UNIQUE # Código jerárquico (1105)|nombre:string # Nombre de la cuenta|naturaleza:enum(deudora,acreedora) # Naturaleza del saldo|tipo:enum(activo,pasivo,patrimonio,ingreso,costo,gasto) # Clasificación|clasificacion_corriente:enum(corriente,no_corriente,na) # Para el estado de situación financiera|padre_id:FK plan NULL # Cuenta superior|nivel:int # Nivel en el árbol|acepta_movimientos:bool # Solo las hojas reciben asientos|norma_referencia:string # NIC/NIIF/Sección que la respalda|moneda_id:FK catalogos # Moneda|requiere_centro_costo:bool # Exige centro de costo|requiere_proyecto:bool # Exige proyecto|cuenta_estado_resultados:bool # Se refleja en resultados|activo:bool # Vigente'},

cxp:{i:'trendd',t:'Cuentas por pagar',d:'Lo que se debe a proveedores, vencimientos y antigüedad de saldos.',
 c:[['Documento','c'],['Proveedor','x'],['Emisión','d'],['Vence','d'],['Saldo','m'],['Antigüedad','g'],['Estado','s']],
 r:[['A-2210948','Cementos del Sur|OC-2026-118','18 nov','18 dic',48500,'Vigente','Pendiente'],['B-77120','Acero Centro|OC-2026-099','02 oct','01 nov',112300,'+ 20 días','Vencida'],['F-004521','Ferretería El Maestro|OC-2026-120','19 nov','04 dic',6780,'Vigente','Pendiente'],['C-88321','Dist. Eléctrica GT|OC-2026-105','28 oct','27 nov',12000,'Vence en 6 días','Parcial'],['A-2209120','Cementos del Sur|OC-2026-110','05 oct','04 nov',31900,'+ 17 días','Vencida'],['P-30012','Pinturas del Norte|OC-2026-103','20 oct','19 nov',9600,'+ 2 días','Vencida'],['G-5509','Agregados Mixco|OC-2026-117','14 nov','22 nov',9600,'Vence mañana','Pendiente'],['F-004380','Ferretería El Maestro|OC-2026-116','11 nov','26 nov',0,'Pagada','Pagada']],
 ex:['Total por pagar','Q 230,680'],
 f:'proveedor_id:FK proveedores # Proveedor|factura_id:FK frec # Factura recibida que origina la deuda|compra_id:FK compras NULL # Orden de compra|proyecto_id:FK proyectos # Proyecto al que se imputa|centro_costo_id:FK departamentos NULL # Centro de costo|fecha_emision:date # Emisión de la factura|fecha_vencimiento:date # Según crédito pactado|condicion_pago_dias:int # Días de crédito|moneda_id:FK catalogos # Moneda|tipo_cambio:decimal # Tipo de cambio|monto_original:decimal # Total de la factura|retenciones:decimal # IVA/ISR retenidos|monto_pagado:decimal # Pagos aplicados|saldo:decimal # Pendiente|dias_vencido:int # Calculado diariamente|descuento_pronto_pago:decimal NULL # Descuento si paga antes|asiento_id:FK contabilidad NULL # Asiento contable|estado:enum(pendiente,parcial,pagada,vencida,anulada) # Estado'},

cxc:{i:'trend',t:'Cuentas por cobrar',d:'Lo que los clientes deben por estimaciones y anticipos.',
 c:[['Documento','c'],['Cliente','x'],['Emisión','d'],['Vence','d'],['Saldo','m'],['Antigüedad','g'],['Estado','s']],
 r:[['FE-0415','Vista SA|PRY-007 · Estimación 9','20 nov','20 dic',540000,'Vigente','Emitida'],['FE-0412','Inmobiliaria Vista|PRY-001 · Estimación 8','12 nov','12 dic',420000,'Vigente','Emitida'],['FE-0411','Grupo Cedros|PRY-002 · Estimación 3','05 nov','05 dic',185000,'Vigente','Emitida'],['FE-0398','Gobierno local|PRY-005 · Estimación 5','28 sep','28 oct',310000,'+ 24 días','Vencida'],['FE-0409','LogiPlus|PRY-003 · Retención','17 nov','17 dic',0,'Cobrada','Cobrada'],['FE-0405','Retail GT|PRY-004 · Anticipo 20 %','10 oct','09 nov',0,'Cobrada','Cobrada']],
 ex:['Por cobrar','Q 1.45 M'],
 f:'cliente_id:FK proveedores # Cliente (entidad)|factura_emitida_id:FK femi # Factura que origina el cobro|proyecto_id:FK proyectos # Proyecto|estimacion_no:int NULL # Número de estimación|fecha_emision:date # Emisión|fecha_vencimiento:date # Vencimiento|monto_original:decimal # Total facturado|retencion_garantia:decimal # Retención del cliente (fondo de garantía)|monto_cobrado:decimal # Cobros aplicados|saldo:decimal # Pendiente|dias_vencido:int # Calculado diariamente|asiento_id:FK contabilidad NULL # Asiento contable|estado:enum(emitida,parcial,cobrada,vencida,anulada) # Estado'},

eeff:{i:'scale',t:'Estados financieros',d:'Situación financiera y resultados bajo NIIF, comparados con el período anterior.',
 c:[['Concepto','x'],['Estado','s'],['Actual','m'],['Anterior','m'],['Norma','g']],
 kp:[['Activos totales','Q 5.86 M'],['Pasivos','Q 0.72 M'],['Utilidad antes de ISR','Q 1.27 M']],
 r:[['Efectivo y equivalentes|Cuenta 1101','Situación',1840000,1520000,'NIC 7'],['Cuentas por cobrar|Cuenta 1103','Situación',920000,780000,'NIIF 9'],['Inventarios|Cuenta 1105','Situación',1200000,1050000,'NIC 2'],['Propiedades, planta y equipo (neto)|Cuentas 1201–1299','Situación',1900000,1980000,'NIC 16'],['Total activos|','Situación',5860000,5330000,'NIC 1'],['Cuentas por pagar|Cuenta 2101','Situación',640000,590000,'NIIF 9'],['Impuestos por pagar|Cuenta 2110','Situación',84500,70200,'NIC 12'],['Patrimonio|Cuentas 3xxx','Situación',5135500,4669800,'NIC 1'],['Total pasivo y patrimonio|','Situación',5860000,5330000,'NIC 1'],['Ingresos por contratos|Cuenta 4101','Resultados',9800000,8600000,'NIIF 15'],['Costo de obra|Cuenta 5101','Resultados',-7350000,-6600000,'NIIF 15'],['Utilidad bruta|','Resultados',2450000,2000000,'NIC 1'],['Gastos de administración|Cuentas 6xxx','Resultados',-1180000,-1010000,'NIC 1'],['Utilidad antes de impuestos|','Resultados',1270000,990000,'NIC 1']],
 ex:['Cuadre','Activos = Pasivo + Patrimonio'],
 f:'periodo_id:FK catalogos # Período contable|tipo_estado:enum(situacion_financiera,resultados,flujo_efectivo,cambios_patrimonio) # Estado financiero|linea_codigo:string # Código de la línea|concepto:string # Concepto presentado|cuentas_incluidas:json # Cuentas del plan que se agrupan|monto_actual:decimal # Período actual|monto_anterior:decimal # Período comparativo|norma_referencia:string # NIC/NIIF que la respalda|nota_explicativa:text NULL # Nota a los estados financieros|marco:enum(niif_completas,niif_pymes) # Marco contable|version:int # Versión del reporte'},

cierre:{i:'lock',t:'Cierre de período',d:'Lista de control para cerrar cada mes sin dejar pendientes.',
 c:[['Período','x'],['Asientos','n'],['Conciliación','g'],['Depreciación','g'],['Provisiones','g'],['Estado','s']],
 r:[['Noviembre 2026|Cierre mensual',48,'Pendiente','Pendiente','Pendiente','Abierto'],['Octubre 2026|Cierre mensual',212,'Hecha','Hecha','Hecha','Cerrado'],['Septiembre 2026|Cierre mensual',198,'Hecha','Hecha','Hecha','Cerrado'],['Agosto 2026|Cierre mensual',205,'Hecha','Hecha','Hecha','Cerrado'],['Julio 2026|Cierre mensual',190,'Hecha','Hecha','Hecha','Cerrado'],['Junio 2026|Cierre semestral',187,'Hecha','Hecha','Hecha','Cerrado']],
 ex:['Próximo cierre','30 nov'],
 f:'periodo:string UNIQUE # Período (AAAA-MM)|fecha_inicio:date # Inicio|fecha_fin:date # Fin|asientos_totales:int # Asientos del período|conciliacion_bancaria_ok:bool # Bancos conciliados|depreciacion_ok:bool # Depreciación contabilizada|provisiones_ok:bool # Provisiones y ajustes|revision_ok:bool # Revisión del administrativo|cerrado_por:FK usuarios NULL # Quien cerró|fecha_cierre:datetime NULL # Momento del cierre|puede_reabrir:bool # Admite reapertura con justificación|motivo_reapertura:text NULL # Justificación|estado:enum(abierto,en_proceso,cerrado) # Estado'}
});

/* ---------- Facturación ---------- */
Object.assign(M,{
frec:{i:'download',t:'Facturas recibidas',d:'Facturas FEL de proveedores, validadas contra la orden y la recepción.',
 c:[['Factura','x'],['Proveedor','t'],['Fecha','d'],['Proyecto','c'],['Subtotal','m'],['IVA 12 %','m'],['Total','m'],['Estado','s']],
 r:[['A-2210948|FEL 7F3A-91C2…','Cementos del Sur','18 nov','PRY-001',43303.57,5196.43,48500,'Certificada'],['F-004521|FEL B21D-4410…','Ferretería El Maestro','19 nov','PRY-002',6053.57,726.43,6780,'Certificada'],['B-77120|FEL 0C9E-77AA…','Acero Centro','02 oct','PRY-004',100267.86,12032.14,112300,'Certificada'],['C-88321|FEL 4D15-23BF…','Dist. Eléctrica GT','28 oct','PRY-001',20892.86,2507.14,23400,'Certificada'],['G-5509|FEL 91B0-5E6D…','Agregados Mixco','14 nov','PRY-003',8571.43,1028.57,9600,'Pendiente'],['X-1002|FEL E8F2-0A11…','Maderas y Más','20 nov','PRY-007',12500,1500,14000,'Rechazada']],
 ex:['Crédito fiscal (mes)','Q 96,400'],
 f:'serie:string # Serie de la factura|numero:string # Número|uuid_fel:string UNIQUE # Autorización FEL (SAT)|proveedor_id:FK proveedores # Emisor|compra_id:FK compras NULL # Orden de compra relacionada|recepcion_id:FK bodega NULL # Recepción en bodega (validación de 3 vías)|proyecto_id:FK proyectos # Proyecto|fecha_emision:date # Fecha de emisión|moneda_id:FK catalogos # Moneda|subtotal:decimal # Subtotal|iva:decimal # IVA 12 %|total:decimal # Total|validacion_3_vias:enum(pendiente,coincide,diferencia) # Orden = recepción = factura|diferencia_monto:decimal NULL # Diferencia detectada|motivo_rechazo:text NULL # Razón si se rechaza|pdf_url:string NULL # Respaldo|xml_url:string NULL # XML certificado|registrado_por:FK usuarios # Quien la registró|asiento_id:FK contabilidad NULL # Asiento generado|estado:enum(pendiente,certificada,rechazada,anulada) # Estado'},

femi:{i:'upload',t:'Facturas emitidas',d:'Facturas al cliente por estimaciones, anticipos y retenciones.',
 c:[['Factura','x'],['Cliente','t'],['Fecha','d'],['Proyecto','c'],['Concepto','t'],['Total','m'],['Estado','s']],
 r:[['FE-0415|FEL 22AD-6B01…','Vista SA','20 nov','PRY-007','Estimación 9 · 92 %',540000,'Emitida'],['FE-0412|FEL 19C7-0F3E…','Inmobiliaria Vista','12 nov','PRY-001','Estimación 8',420000,'Emitida'],['FE-0411|FEL 8E41-D2A9…','Grupo Cedros','05 nov','PRY-002','Estimación 3',185000,'Emitida'],['FE-0409|FEL A305-77C4…','LogiPlus','17 nov','PRY-003','Devolución de retención',96000,'Cobrada'],['FE-0405|FEL 5B90-1E22…','Retail GT','10 oct','PRY-004','Anticipo 20 %',250000,'Cobrada'],['FE-0416|—','Gobierno local','21 nov','PRY-005','Estimación 6 (en preparación)',275000,'Borrador']],
 ex:['Facturado en noviembre','Q 1.2 M'],
 f:'serie:string # Serie|numero:string # Número|uuid_fel:string NULL UNIQUE # Autorización FEL|cliente_id:FK proveedores # Cliente|proyecto_id:FK proyectos # Proyecto|estimacion_no:int NULL # Estimación|tipo:enum(estimacion,anticipo,retencion,otro) # Tipo de cobro|fecha_emision:date # Fecha|porcentaje_avance:decimal NULL # Avance acumulado que respalda|moneda_id:FK catalogos # Moneda|subtotal:decimal # Subtotal|iva:decimal # IVA 12 %|total:decimal # Total|retencion_garantia:decimal # Fondo de garantía|aprobacion_cliente_url:string NULL # Estimación firmada|emitido_por:FK usuarios # Quien emitió|asiento_id:FK contabilidad NULL # Asiento (ingreso por grado de avance)|estado:enum(borrador,emitida,cobrada,anulada) # Estado'},

notas:{i:'edit',t:'Notas de crédito y débito',d:'Ajustes sobre facturas: devoluciones, descuentos y diferencias.',
 c:[['Nota','c'],['Tipo','g'],['Factura','c'],['Fecha','d'],['Motivo','t'],['Monto','m'],['Estado','s']],
 r:[['NC-0031','Nota de crédito','FE-0398','30 oct','Ajuste de medición',15000,'Certificada'],['NC-0032','Nota de crédito','A-2209120','12 nov','Devolución de 20 sacos',1850,'Certificada'],['ND-0007','Nota de débito','FE-0405','05 nov','Intereses por mora',3200,'Certificada'],['NC-0033','Nota de crédito','F-004380','18 nov','Descuento pronto pago',410,'Pendiente'],['NC-0034','Nota de crédito','B-77120','19 nov','Diferencia de precio',2250,'Rechazada']],
 ex:['Notas del mes','5'],
 f:'serie:string # Serie|numero:string # Número|uuid_fel:string NULL UNIQUE # Autorización FEL|tipo:enum(credito,debito) # Tipo de nota|sentido:enum(emitida,recibida) # Si la emite la empresa o el proveedor|factura_origen_id:uuid # Factura original (emitida o recibida)|fecha:date # Fecha|motivo:enum(devolucion,descuento,diferencia_precio,mora,error) # Motivo|descripcion:text NULL # Detalle|monto:decimal # Monto sin IVA|iva:decimal # IVA|total:decimal # Total|asiento_id:FK contabilidad NULL # Asiento generado|estado:enum(pendiente,certificada,rechazada,anulada) # Estado'},

ret:{i:'percent',t:'Retenciones IVA / ISR',d:'Retenciones practicadas al pagar y su declaración a la SAT.',
 c:[['Constancia','c'],['Impuesto','g'],['Proveedor','t'],['Factura','c'],['Base','m'],['Retenido','m'],['Período','g'],['Estado','s']],
 r:[['RET-0210','IVA','Cementos del Sur','A-2210948',5196.43,779.46,'Nov 2026','Pendiente'],['RET-0209','ISR','Transportes del Sur','T-5512',18000,900,'Nov 2026','Pendiente'],['RET-0208','ISR','Acero Centro','B-77120',100267.86,5013.39,'Oct 2026','Declarada'],['RET-0207','IVA','Acero Centro','B-77120',12032.14,1804.82,'Oct 2026','Declarada'],['RET-0206','ISR','Dist. Eléctrica GT','C-88321',20892.86,1044.64,'Oct 2026','Declarada']],
 ex:['Por trasladar a SAT','Q 1,679'],
 f:'constancia_no:string UNIQUE # Número de constancia|impuesto:enum(iva,isr) # Impuesto retenido|proveedor_id:FK proveedores # Sujeto retenido|factura_id:FK frec # Factura sobre la que se retiene|pago_id:FK tesoreria NULL # Pago en el que se practicó|base_imponible:decimal # Base de cálculo|porcentaje:decimal # Porcentaje aplicado|monto_retenido:decimal # Monto retenido|periodo:string # Período de declaración (AAAA-MM)|fecha_declaracion:date NULL # Cuando se declaró|constancia_url:string NULL # Constancia emitida|asiento_id:FK contabilidad NULL # Asiento generado|estado:enum(pendiente,declarada,anulada) # Estado'},

procesos:{i:'flow',t:'Procesos y capacitación',g:'Guía',d:'Cada proceso paso a paso.',c:[],r:[],ex:['','']}
});

/* ---------- Navegación jerárquica y perfiles ---------- */
const NAV={'Guía':['procesos'],'Operación':['proyectos','bodegas','bodega','inventarios','metas','compras','activos'],'Personas':['trabajadores','departamentos','usuarios','roles'],'Finanzas':['proveedores','tesoreria','@conta','@fact'],'Datos':['catalogos','reportes','migraciones']};
const SUBS={conta:{t:'Contabilidad NIIF',i:'ledger',k:['plan','contabilidad','cxp','cxc','eeff','cierre']},fact:{t:'Facturación',i:'receipt',k:['frec','femi','notas','ret']}};
const SUBOF={};Object.keys(SUBS).forEach(s=>SUBS[s].k.forEach(k=>SUBOF[k]=s));
const ACC={admin:Object.keys(M),maestro:['procesos','proyectos','bodegas','bodega','inventarios','metas','compras','activos','trabajadores'],obrero:['procesos','bodega','metas','inventarios']};
const EMAIL={admin:'luis@panoramic.gt',maestro:'ana@panoramic.gt',obrero:'carlos@panoramic.gt'};

/* ---------- ¿Por qué existe cada módulo? ---------- */
const WHY={
usuarios:'Cada persona entra con su propia cuenta para que toda acción quede a su nombre. Sin eso no hay trazabilidad: nadie sabe quién aprobó qué.',
roles:'Define qué puede ver y hacer cada perfil. Un obrero no necesita ver costos y un contador no necesita aprobar despachos. Menos accesos, menos errores y fraudes.',
catalogos:'Una sola lista de unidades, monedas y categorías evita que "saco", "SACO" y "Sacos" sean cosas distintas, y permite sumar y comparar.',
proyectos:'Todo el dinero, material y personal se imputa a un proyecto. Es la unidad con la que se mide si una obra gana o pierde dinero.',
bodegas:'Cada proyecto tiene su(s) bodega(s) y su propio inventario. Así el costo del material cae en la obra que lo usa y se sabe quién tiene qué, sin mezclar obras.',
inventarios:'Dice cuánto material hay en cada bodega y a qué costo. Evita paros por falta de material y compras duplicadas, y es la base del costo de obra.',
bodega:'Cada entrada, salida o traslado deja un vale. Es el respaldo del costo cargado a la obra y la forma de detectar mermas y pérdidas.',
proveedores:'Un padrón único con NIT, crédito y calificación permite comparar precios, validar facturas y pagar a tiempo.',
trabajadores:'Es la base de la planilla, la asistencia y la seguridad social. Sin ficha completa (DPI, IGSS, contrato) no se puede pagar ni cumplir con la ley.',
metas:'Convierte el avance de obra en hitos medibles con responsable y fecha. Permite ver atrasos a tiempo y sustenta el avance que se cobra al cliente.',
compras:'Ordena el gasto antes de que ocurra: se pide, se compara, se aprueba y recién entonces se compra. Separa quien solicita de quien autoriza.',
activos:'La maquinaria es una inversión grande que pierde valor cada mes. Registrarla permite depreciarla, programar mantenimiento y cargarla a cada obra.',
departamentos:'Son los centros de costo: permiten saber cuánto gasta cada área frente a su presupuesto.',
tesoreria:'Muestra el dinero real: lo que entra y sale de bancos y caja. Conciliar contra el banco evita sorpresas de liquidez.',
reportes:'Entrega a cada nivel de mando la información que necesita sin pedirla a mano: gerencia ve avance y caja, bodega ve stock crítico.',
migraciones:'Lleva datos desde Excel o sistemas antiguos al formato estándar, limpiando duplicados y errores, para arrancar con información confiable.',
plan:'Es el "idioma" de la contabilidad: cada hecho económico se registra en una cuenta con su naturaleza y su norma. Con un plan ordenado, los estados financieros salen solos.',
contabilidad:'El libro diario registra cada hecho económico con partida doble (Debe = Haber). Es el respaldo legal y la fuente de los estados financieros.',
cxp:'Controla lo que se debe a proveedores y cuándo vence. Pagar a tiempo mantiene el crédito y aprovecha descuentos. Es un pasivo que aparece en el balance.',
cxc:'Controla lo que los clientes deben por estimaciones facturadas. Sin seguimiento, la obra termina financiándose con dinero propio.',
eeff:'Resume la salud financiera en los estados que exige NIIF: situación financiera, resultados y flujo de efectivo. Es lo que leen gerencia, bancos y auditores.',
cierre:'Cerrar el período bloquea cambios y garantiza que lo ya reportado no se altere. Se hace después de conciliar, depreciar y provisionar.',
frec:'La factura del proveedor (FEL) es el documento legal que respalda el gasto y el crédito fiscal del IVA. Se valida contra la orden de compra y la recepción ("3 vías").',
femi:'Con la factura de la estimación se cobra al cliente y se reconoce el ingreso según el avance real de la obra.',
notas:'Corrigen facturas ya emitidas (devoluciones, descuentos, diferencias) sin alterar el documento original.',
ret:'Cuando la ley lo exige, se retiene IVA o ISR al pagar y se traslada a la SAT. Registrarlo a tiempo evita multas y diferencias en la declaración.',
procesos:'Muestra cada proceso de principio a fin y quién interviene, para que cualquiera entienda su parte, a quién reporta y por qué importa.'};
const NORM={inventarios:'NIC 2 · NIIF PYMES Sec. 13 (inventarios al costo)',activos:'NIC 16 · NIIF PYMES Sec. 17 (propiedad, planta y equipo)',tesoreria:'NIC 7 · NIIF PYMES Sec. 7 (flujo de efectivo)',plan:'NIC 1 · NIIF PYMES Sec. 4 (presentación de estados financieros)',contabilidad:'Marco conceptual NIIF: base de acumulación (devengo) y partida doble',cxp:'NIIF 9 · NIIF PYMES Sec. 11 (pasivos financieros)',cxc:'NIIF 9 · Sec. 11 y NIIF 15 · Sec. 23',eeff:'NIC 1 · NIC 7 · NIIF PYMES Sec. 3 a 7',cierre:'NIC 8 · NIIF PYMES Sec. 10 (período, políticas y errores)',frec:'Ley del IVA y facturación electrónica FEL (SAT, Guatemala)',femi:'NIIF 15 · NIIF PYMES Sec. 23 (ingresos) y FEL',notas:'Ley del IVA y FEL (notas de crédito y débito)',ret:'Ley del IVA e ISR: retenciones a trasladar a la SAT'};

/* ---------- Flujos de proceso lineales ---------- */
const NIV={'Gerencia':1,'Administrativo':2,'Compras':3,'Contador':3,'Residente':3,'Maestro de Obra':4,'Bodeguero':5,'Obrero':5,'Sistema':0};
const MIROL={admin:['Administrativo','Compras','Contador','Gerencia'],maestro:['Maestro de Obra','Residente'],obrero:['Obrero']};
const FLOWS={
compra:{t:'De la necesidad al pago',i:'cart',d:'Cómo se compra un material, cómo se recibe y cómo se paga con su factura.',steps:[
 {t:'Requisición',a:'Maestro de Obra',m:'compras',w:'El maestro conoce lo que realmente falta en la obra. Registrarlo evita compras "de palabra" y deja claro quién pidió qué y para qué proyecto.',d:'Requisición de material'},
 {t:'Cotización',a:'Compras',m:'proveedores',w:'Comparar al menos tres proveedores protege el precio y deja evidencia de que se eligió la mejor oferta.',d:'Cuadro comparativo'},
 {t:'Aprobación de la orden',a:'Administrativo',m:'compras',w:'Quien pide no aprueba. Separar funciones reduce errores y fraudes; el monto define qué nivel de mando autoriza.',d:'Orden de compra (OC) aprobada'},
 {t:'Recepción en bodega',a:'Bodeguero',m:'bodega',w:'Se verifica que lo recibido coincida con la OC antes de aceptarlo. Aquí nace el inventario del proyecto.',d:'Vale de entrada',x:[['1105 Inventarios',43303.57,null],['2102 Mercadería recibida por facturar',null,43303.57]],n:'NIC 2 · Sec. 13: el inventario se mide al costo.'},
 {t:'Registro de la factura',a:'Contador',m:'frec',w:'La factura FEL es el documento legal del gasto y del crédito fiscal. Se valida contra la OC y la recepción ("3 vías"): si no coinciden, no se paga.',d:'Factura FEL validada',x:[['2102 Mercadería por facturar',43303.57,null],['1108 IVA crédito fiscal',5196.43,null],['2101 Proveedores',null,48500]],n:'Pasivo financiero reconocido al recibir la factura.'},
 {t:'Cuenta por pagar',a:'Contador',m:'cxp',w:'Se programa según el crédito pactado (por ejemplo 30 días). Pagar a tiempo mantiene el crédito y evita recargos.',d:'Programación de pagos',n:'NIIF 9 · Sec. 11: pasivos financieros.'},
 {t:'Pago y retenciones',a:'Administrativo',m:'tesoreria',w:'Se paga solo lo aprobado y se retiene IVA/ISR cuando la ley lo exige. En pagos grandes firman dos personas.',d:'Transferencia y constancia de retención',x:[['2101 Proveedores',48500,null],['1101 Bancos',null,47720.54],['2112 Retención IVA por pagar',null,779.46]]},
 {t:'Conciliación y asiento',a:'Contador',m:'contabilidad',w:'Se compara el banco con los libros. Lo que no cuadra se investiga antes de cerrar el mes.',d:'Asiento de diario conciliado'}]},
material:{t:'Solicitud y despacho de material',i:'warehouse',d:'Desde que un obrero necesita material hasta que el costo llega a la obra.',steps:[
 {t:'Solicitud',a:'Obrero',m:'bodega',w:'Quien trabaja sabe qué necesita. Pedirlo en el sistema evita viajes a la bodega sin saber si hay material.',d:'Solicitud de material'},
 {t:'Autorización',a:'Maestro de Obra',m:'bodega',w:'El maestro valida que la cantidad corresponda al avance real y al presupuesto de la obra.',d:'Solicitud autorizada'},
 {t:'Despacho',a:'Bodeguero',m:'bodega',w:'Se entrega contra un vale firmado. Sin firma no hay respaldo si después falta material.',d:'Vale de salida firmado'},
 {t:'Descuento de inventario',a:'Sistema',m:'inventarios',w:'El stock de esa bodega baja al instante, al costo promedio. Si llega al mínimo, se genera una alerta.',d:'Kardex actualizado'},
 {t:'Costo a la obra',a:'Contador',m:'contabilidad',w:'Lo que se usó se convierte en costo del proyecto. Así se sabe cuánto cuesta de verdad cada obra.',d:'Asiento de costo',x:[['5101 Costo de obra',3700,null],['1105 Inventarios',null,3700]],n:'NIIF PYMES Sec. 13: el inventario consumido pasa a costo.'},
 {t:'Alerta de stock mínimo',a:'Sistema',m:'compras',w:'Cuando el stock cae bajo el mínimo se sugiere una requisición y el ciclo de compra vuelve a empezar.',d:'Requisición sugerida'}]},
traslado:{t:'Traslado entre bodegas',i:'migrate',d:'Mover material de la bodega de un proyecto a la de otro, sin perder el rastro del costo.',steps:[
 {t:'Solicitud de traslado',a:'Maestro de Obra',m:'bodega',w:'Una obra puede tener material que otra necesita. Trasladar evita comprar de más.',d:'Solicitud de traslado'},
 {t:'Revisión del residente',a:'Residente',m:'proyectos',w:'Confirma que el traslado no deja a la obra de origen sin material crítico.',d:'Visto bueno'},
 {t:'Aprobación administrativa',a:'Administrativo',m:'bodega',w:'Mover material entre proyectos cambia el costo de ambas obras, por eso lo autoriza un nivel superior.',d:'Traslado autorizado'},
 {t:'Salida de bodega origen',a:'Bodeguero',m:'bodega',w:'La bodega de origen entrega y firma. El material queda "en tránsito" hasta que llegue.',d:'Vale de traslado'},
 {t:'Recepción en destino',a:'Bodeguero',m:'bodega',w:'La bodega destino confirma las cantidades. Si hay diferencia, se registra como ajuste y se investiga.',d:'Vale de recepción'},
 {t:'Costo entre proyectos',a:'Contador',m:'contabilidad',w:'El costo sale de un proyecto y entra en el otro sin afectar el resultado total de la empresa.',d:'Asiento de traslado',x:[['1105 Inventarios · Vista Hermosa',640,null],['1105 Inventarios · Torre Z10',null,640]]}]},
cobro:{t:'De la estimación al cobro',i:'trend',d:'Cómo se mide el avance, se factura al cliente y se cobra.',steps:[
 {t:'Medición de avance',a:'Maestro de Obra',m:'metas',w:'El avance medido en campo es la base para cobrar. Se respalda con mediciones y fotografías.',d:'Informe de avance'},
 {t:'Estimación aprobada',a:'Residente',m:'proyectos',w:'El cliente y el residente validan lo ejecutado antes de facturar, para evitar discusiones después.',d:'Estimación firmada'},
 {t:'Factura al cliente',a:'Contador',m:'femi',w:'Se emite la factura electrónica (FEL) por lo aprobado. Sin factura no hay cobro ni ingreso legal.',d:'Factura FEL',x:[['1103 Cuentas por cobrar',540000,null],['4101 Ingresos por contratos',null,482142.86],['2110 IVA por pagar',null,57857.14]],n:'NIIF 15 · Sec. 23: el ingreso se reconoce según el avance de la obra.'},
 {t:'Cuenta por cobrar',a:'Contador',m:'cxc',w:'El seguimiento de vencimientos permite cobrar a tiempo. Una obra no debe financiarse sola.',d:'Estado de cuenta del cliente'},
 {t:'Cobro',a:'Administrativo',m:'tesoreria',w:'El dinero entra al banco y se aplica a la factura correspondiente.',d:'Boleta de depósito',x:[['1101 Bancos',540000,null],['1103 Cuentas por cobrar',null,540000]]},
 {t:'Conciliación',a:'Contador',m:'contabilidad',w:'Se verifica que lo cobrado coincida con el banco antes de cerrar el período.',d:'Asiento conciliado'}]},
planilla:{t:'Planilla semanal',i:'hardhat',d:'Del registro de asistencia al pago y la carga por proyecto.',steps:[
 {t:'Asistencia',a:'Maestro de Obra',m:'trabajadores',w:'Registrar los días trabajados por proyecto permite pagar lo justo y cargar la mano de obra a cada obra.',d:'Reporte de asistencia'},
 {t:'Cálculo de planilla',a:'Administrativo',m:'trabajadores',w:'Se calculan salarios, bonificación y descuentos de ley (IGSS). Es un proceso mecánico que no debe hacerse a mano.',d:'Planilla calculada'},
 {t:'Aprobación',a:'Gerencia',m:'tesoreria',w:'Un nivel superior autoriza el desembolso. Revisa totales y cambios inusuales.',d:'Planilla aprobada'},
 {t:'Pago',a:'Administrativo',m:'tesoreria',w:'El pago por transferencia deja respaldo y evita manejar efectivo en obra.',d:'Transferencias',x:[['2105 Sueldos por pagar',31200,null],['1101 Bancos',null,31200]]},
 {t:'IGSS e impuestos',a:'Contador',m:'ret',w:'Las cuotas y retenciones se pagan a cada entidad en su fecha límite.',d:'Constancias de pago'},
 {t:'Costo por proyecto',a:'Contador',m:'contabilidad',w:'La mano de obra se asigna a cada proyecto según la asistencia.',d:'Asiento de planilla',x:[['5101 Costo de obra',31200,null],['2105 Sueldos por pagar',null,31200]]}]},
cierre:{t:'Cierre contable mensual',i:'lock',d:'Lista de control para cerrar el mes con información confiable.',steps:[
 {t:'Conciliación bancaria',a:'Contador',m:'tesoreria',w:'Compara el banco con los libros. Las diferencias se explican antes de seguir.',d:'Conciliación firmada'},
 {t:'Depreciación de activos',a:'Contador',m:'activos',w:'La maquinaria pierde valor cada mes; ese desgaste es un gasto real aunque no salga dinero.',d:'Cuadro de depreciación',x:[['6102 Depreciación del ejercicio',14820,null],['1299 Depreciación acumulada',null,14820]],n:'NIC 16 · Sec. 17.'},
 {t:'Provisiones y ajustes',a:'Contador',m:'contabilidad',w:'Se reconocen gastos ya incurridos aunque todavía no estén facturados (base de acumulación).',d:'Asientos de ajuste',n:'Marco conceptual NIIF: devengo.'},
 {t:'Revisión de asientos',a:'Administrativo',m:'contabilidad',w:'Una segunda persona revisa. Los errores detectados ahora no llegan a los estados financieros.',d:'Libro diario revisado'},
 {t:'Cierre del período',a:'Administrativo',m:'cierre',w:'Cerrar bloquea cambios: lo ya reportado no se puede alterar sin justificación.',d:'Período cerrado'},
 {t:'Estados financieros',a:'Gerencia',m:'eeff',w:'Con el período cerrado se emiten los estados que leen gerencia, bancos y auditores.',d:'Estados financieros NIIF',n:'NIC 1 · NIIF PYMES Sec. 3 a 7.'}]},
migra:{t:'Migración de datos',i:'db',d:'Cómo llevar información de Excel o sistemas antiguos al formato estándar.',steps:[
 {t:'Origen',a:'Administrativo',m:'migraciones',w:'Se elige la fuente (Excel, CSV o base legacy) y se guarda un respaldo del archivo original.',d:'Archivo de origen'},
 {t:'Mapeo de columnas',a:'Administrativo',m:'migraciones',w:'Cada columna antigua se asigna a un campo estándar. Se guarda como plantilla para la próxima carga.',d:'Plantilla de mapeo'},
 {t:'Validación',a:'Administrativo',m:'migraciones',w:'Se detectan duplicados, vacíos y formatos incorrectos antes de tocar los datos reales.',d:'Reporte de errores'},
 {t:'Importación',a:'Sistema',m:'migraciones',w:'Se cargan solo los datos válidos, en un lote identificable que puede revertirse.',d:'Lote de importación'},
 {t:'Verificación',a:'Administrativo',m:'inventarios',w:'Se comparan totales contra el origen. Si algo no cuadra, se revierte el lote completo.',d:'Acta de verificación'}]}};
const MODFL={};Object.keys(FLOWS).forEach(f=>FLOWS[f].steps.forEach((s,i)=>{if(s.m&&!MODFL[s.m])MODFL[s.m]=[f,i]}));
const CMD=[
 ['Gerencia',1,'Define presupuestos y aprueba lo mayor.','Fija el rumbo de la empresa y firma los pagos y compras grandes.','Junta / Dueños','Reportes · Estados financieros','users'],
 ['Administrativo',2,'Controla compras, pagos y cierres.','Aprueba traslados y órdenes medianas. Supervisa a contabilidad y compras.','Gerencia','Todos los módulos','shield'],
 ['Residente · Contador · Compras',3,'Operan su área especializada.','Residente valida estimaciones; contador registra y concilia; compras cotiza.','Administrativo','Proyectos · Contabilidad · Compras','building'],
 ['Maestro de Obra',4,'Dirige la obra en campo.','Autoriza despachos, mide avance y pide materiales para su proyecto.','Residente','Bodega · Metas · Inventarios · Compras','hardhat'],
 ['Obrero · Bodeguero',5,'Ejecutan y registran.','El obrero solicita material y marca tareas; el bodeguero entrega, recibe y firma vales.','Maestro de Obra','Solicitudes · Bodega','hand']];
const MATRIZ=[
 ['Pedir material de bodega','Obrero','Maestro de Obra','Maestro de Obra','Hasta el stock disponible'],
 ['Traslado entre bodegas','Maestro de Obra','Residente','Administrativo','Siempre'],
 ['Requisición de compra','Maestro de Obra','Residente','Compras','Hasta Q 25,000'],
 ['Orden de compra','Compras','Administrativo','Administrativo','Q 25,001 a Q 100,000'],
 ['Orden de compra mayor','Compras','Administrativo','Gerencia','Más de Q 100,000'],
 ['Pago a proveedor','Contador','Administrativo','Gerencia','Más de Q 100,000 (dos firmas)'],
 ['Estimación al cliente','Maestro de Obra','Residente','Administrativo','Cada estimación'],
 ['Ajuste de inventario','Bodeguero','Maestro de Obra','Administrativo','Cualquier diferencia'],
 ['Cierre de período','Contador','Administrativo','Gerencia','Mensual']];
