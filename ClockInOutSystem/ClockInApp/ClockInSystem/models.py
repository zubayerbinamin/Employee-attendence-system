from django.db import models

class ClockInLog(models.Model):
    guardId = models.IntegerField()
    clockIn = models.DateTimeField(null=True, blank=True)
    clockOut = models.DateTimeField(null=True, blank=True)
    numberOfHours = models.IntegerField(null=True, blank=True)

    def __str__(self):
    
        return f"ID: {self.guardId} Clock In: {self.clockIn} Clock Out: {self.clockOut} for {self.numberOfHours}"

# Create your models here.
