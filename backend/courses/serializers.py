from rest_framework import serializers
from .models import Course, Chapter

# 1. Pehle Chapter ka Translator banaya
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'

# 2. Phir Course ke Translator ko bataya ki uske andar chapters bhi hain
class CourseSerializer(serializers.ModelSerializer):
    # 'chapters' naam humne models.py mein related_name='chapters' me diya tha
    chapters = ChapterSerializer(many=True, read_only=True) 

    class Meta:
        model = Course
        # 👇 YAHAN MAGIC HAI: Humne list mein 'is_featured' add kar diya hai
        fields = ['id', 'title', 'description', 'price', 'is_featured', 'chapters']