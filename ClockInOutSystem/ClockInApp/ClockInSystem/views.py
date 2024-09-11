from django.shortcuts import render
import json
from django.db import IntegrityError
from django.http import JsonResponse
from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import logSerializer
from django.views.decorators.csrf import csrf_exempt
from .models import ClockInLog
import time
from datetime import datetime



# Create your views here.

def index(request):
    return render(request, "ClockInSystem/index.html")

@api_view(['GET'])
def log(request):
    log = ClockInLog.objects.all().order_by('-clockIn')
    serializer = logSerializer(log, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def clockin(request):
    seconds = time.time()
    local_time = time.ctime(seconds)
    print("Local time:", local_time)

    clock_in_time = datetime.strptime(local_time, "%a %b %d %H:%M:%S %Y")
    

    if request.method == "POST":
        data = json.loads(request.body)
        guard_id = data.get('guardId')

        try:
            new_log = ClockInLog(guardId=guard_id, clockIn=clock_in_time)
            new_log.save()

            return JsonResponse({'message': 'Clock-in logged successfully', 'log_id': new_log.id})
        
        except IntegrityError as e:
            return JsonResponse({'error': str(e)}, status=400)    
    
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    
@csrf_exempt
def clockout(request):
    seconds = time.time()
    local_time = time.ctime(seconds)
    print("Local time:", local_time)

    clock_out_time = datetime.strptime(local_time, "%a %b %d %H:%M:%S %Y")
    
    if request.method == "PUT":
        data = json.loads(request.body)
        guard_id = data.get('guardId')

        if guard_id is None:
            return JsonResponse({'error': 'Guard ID is required'}, status=400)

        try:
            latest_clock_in = ClockInLog.objects.filter(guardId=guard_id, clockOut__isnull=True).last()

            if latest_clock_in:
                latest_clock_in.clockOut = clock_out_time
                latest_clock_in.save()
                
                return JsonResponse({'message': 'Clock-out logged successfully', 'log_id': latest_clock_in.id})

            else:
                return JsonResponse({'error': 'No clock-in entry found for the given guard ID.'}, status=404)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)