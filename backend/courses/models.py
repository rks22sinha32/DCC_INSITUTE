from django.db import models
from django.utils import timezone

# 1. Course Model
class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title

# 2. Chapter Model
class Chapter(models.Model):
    course = models.ForeignKey(Course, related_name='chapters', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    
    def __str__(self):
        return f"{self.course.title} - {self.title}"

# 3. Enrollment Model
class Enrollment(models.Model):
    student_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_name} - {self.phone}"

# 4. Review Model
class Review(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='reviews', null=True, blank=True)
    student_name = models.CharField(max_length=100)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_name} ({self.rating}*)"

# 5. Batch Model
class Batch(models.Model):
    title = models.CharField(max_length=200)
    time_schedule = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=[('RUNNING', 'Running'), ('UPCOMING', 'Upcoming')])

    def __str__(self):
        return self.title

# 6. Notice Model
class Notice(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField(default=timezone.now)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title