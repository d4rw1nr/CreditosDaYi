from django.db import models
from Aplicaciones.Ventas.models import Ventas
from Aplicaciones.Contabilidad.models import Transacciones

# Create your models here.

class Creditos(models.Model):
    ESTADO_CHOICES = [
        ('al día', 'Al Día'),
        ('en mora', 'En Mora'),
        ('cancelado', 'Cancelado')
    ]

    venta = models.ForeignKey(Ventas, related_name="Creditos", on_delete=models.CASCADE)
    total_credito = models.PositiveIntegerField()
    num_cuotas = models.SmallIntegerField()
    monto_cuotas = models.PositiveIntegerField()
    saldo = models.PositiveIntegerField()
    proximo_pago = models.DateField()
    estado = models.CharField(max_length=15, choices=ESTADO_CHOICES)

    def __str__(self) -> str:
        return f"Credito {self.estado} con saldo de {self.saldo}"


class Pagos(models.Model):
    FORMA_PAGO_CHOICES = [
        ('efectivo', 'Efectivo'),
        ('transferencia', 'Transferencia')
    ]

    transaccion = models.ForeignKey(Transacciones, related_name="Pagos", on_delete=models.CASCADE)
    credito = models.ForeignKey(Creditos, related_name="Pagos", on_delete=models.CASCADE)
    fecha_pago = models.DateTimeField()
    monto = models.PositiveIntegerField()
    forma_pago = models.CharField(max_length=15, choices=FORMA_PAGO_CHOICES)

    def __str__(self) -> str:
        return f"Pago de {self.monto}"