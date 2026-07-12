from django.db import models

# Yeh humara purana Course table hai
class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    # 👇 Yeh nayi line humne add ki hai (VIP Switch)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title

# Yeh naya Table of Content (Chapter) table hai 👇
class Chapter(models.Model):
    # Yeh line is chapter ko ek Course se jodti hai (Link karti hai)
    course = models.ForeignKey(Course, related_name='chapters', on_delete=models.CASCADE)
    
    title = models.CharField(max_length=200) # Jaise: "Introduction to React"
    content = models.TextField() # Chapter ke andar ki padhai (Notes ya video link)
    
    def __str__(self):
        return f"{self.course.title} - {self.title}"