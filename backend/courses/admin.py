from django.contrib import admin
from .models import Course, Chapter # Chapter import kiya

admin.site.register(Course)
admin.site.register(Chapter) # Nayi line add ki