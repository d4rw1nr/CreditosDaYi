from django.db import models

# Create your models here.

class Staff(models.Model):
    nombre = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.IntegerField()
    salario = models.PositiveIntegerField()