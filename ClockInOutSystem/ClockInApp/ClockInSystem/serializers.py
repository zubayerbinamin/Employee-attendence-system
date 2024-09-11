from rest_framework import serializers

from .models import ClockInLog

class logSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClockInLog
        fields = '__all__'
        
