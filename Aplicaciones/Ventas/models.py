from django.db import models
from Aplicaciones.Inventario.models import Productos

# Create your models here.

class Clientes(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre Cliente")
    direccion = models.CharField(max_length=100, verbose_name="Direccion del Cliente")
    telefono = models.IntegerField(verbose_name="Telefono de contacto del cliente")

    def __str__(self) -> str:
        return f"{self.nombre}"


class Ventas(models.Model):
    FORMA_PAGO_CHOICES = [
        ('efectivo', 'Efectivo'),
        ('transferencia', 'Transferencia'),
        ('credito', 'Credito')
    ]

    cliente = models.ForeignKey(Clientes, related_name="Ventas", on_delete=models.CASCADE)
    fecha_venta = models.DateTimeField()
    total_pago = models.PositiveIntegerField()
    forma_pago = models.CharField(max_length=15, choices=FORMA_PAGO_CHOICES)

    def __str__(self) -> str:
        return f"Venta a {self.cliente.nombre} el {self.fecha_venta} por {self.total_pago} a {self.forma_pago}"


class VentasDetalle(models.Model):
    venta = models.ForeignKey(Ventas, related_name="DetallesVenta", on_delete=models.CASCADE)
    producto = models.ForeignKey(Productos, related_name="DetallesVenta", on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio_venta = models.PositiveIntegerField()
    subtotal = models.PositiveIntegerField()

    def __str__(self) -> str:
        return f"Venta de {self.cantidad} {self.producto.nombre} s"