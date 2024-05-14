from django.db import models
from Contabilidad.models import Transacciones
from Inventario.models import Productos

# Create your models here.

class Clientes(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre Cliente")
    direccion = models.CharField(max_length=100, verbose_name="Direccion del Cliente")
    telefono = models.IntegerField(max_length=10, verbose_name="Telefono de contacto del cliente")

    def __str__(self) -> str:
        return f"{self.nombre}"


class Ventas(models.Model):
    FORMA_PAGO_CHOICES = [
        ('efectivo', 'Efectivo'),
        ('transferencia', 'Transferencia'),
        ('credito', 'Credito')
    ]

    transaccion = models.ForeignKey(Transacciones, related_name="Ventas", on_delete=models.CASCADE)
    cliente = models.ForeignKey(Clientes, related_name="Ventas", on_delete=models.CASCADE)
    fecha_venta = models.DateTimeField()
    total_pago = models.PositiveIntegerField()
    forma_pago = models.CharField(max_length=15, choices=FORMA_PAGO_CHOICES)

    def __str__(self) -> str:
        return f"Venta a {self.cliente.nombre} el {self.fecha_venta} por {self.total_pago} a {self.forma_pago}"


class VentasDetalle(models.Model):
    venta = models.ForeignKey(Ventas, related_name="Detalles de la Venta", on_delete=models.CASCADE)
    producto = models.ForeignKey(Productos, related_name="Detalles de la Venta", on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio_venta = models.PositiveIntegerField()

    def __str__(self) -> str:
        return f"Venta de {self.cantidad} {self.producto.nombre}"


class Caja(models.Model):
    fecha = models.DateTimeField()
    monto_apertura = models.IntegerField()
    monto_cierre = models.IntegerField()
    monto_transaccion = models.IntegerField()
    balance = models.IntegerField()
    estado = models.CharField(max_length=10, choices=[('abierto', 'Abierto'), ('cerrado', 'Cerrado')])

    def __str__(self) -> str:
        return f"Caja {self.fecha} - Estado: {self.estado}"