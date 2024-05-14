from django.db import models

# Create your models here.

class Cuentas(models.Model):
    nombre = models.CharField(max_length=100)
    cuenta = models.PositiveIntegerField()
    saldo = models.IntegerField()

    def __str__(self) -> str:
        return f"{self.nombre} {self.cuenta}"


class Transacciones(models.Model):
    fecha = models.DateTimeField()
    cuenta = models.ForeignKey(Cuentas, related_name="Transacciones", on_delete=models.CASCADE)
    monto = models.IntegerField()
    descripcion = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f"{self.fecha} - {self.descripcion} - {self.monto}"


class AsientosContables(models.Model):
    transaccion = models.ForeignKey(Transacciones, related_name="AsientosContables", on_delete=models.CASCADE)
    cuenta = models.ForeignKey(Cuentas, related_name="AsientosContables", on_delete=models.CASCADE)
    debe = models.IntegerField()
    haber = models.IntegerField()
    
    def __str__(self) -> str:
        return f"{self.cuenta} D:{self.debe} H:{self.haber}"
