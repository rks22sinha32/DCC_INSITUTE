from django.contrib import admin
from .models import Course, Chapter, Enrollment, Review, Batch, Notice

# Custom Admin Layouts for deep tracking
@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'phone', 'course', 'enrolled_at')
    list_filter = ('course', 'enrolled_at')
    search_fields = ('student_name', 'email', 'phone')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'course', 'rating', 'created_at')

# Simple Model Registration for new panels
admin.site.register(Course)
admin.site.register(Chapter)
admin.site.register(Batch)
admin.site.register(Notice)