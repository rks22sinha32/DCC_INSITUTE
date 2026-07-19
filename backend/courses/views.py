from rest_framework import generics
from .models import Course, Chapter, Enrollment, Review, Batch, Notice
from .serializers import (
    CourseSerializer, EnrollmentSerializer, ReviewSerializer, 
    BatchSerializer, NoticeSerializer
)

# 1. Batch & Notice Views
class BatchList(generics.ListAPIView):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer

class NoticeList(generics.ListAPIView):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer

# 2. Course, Enrollment & Review Views
class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class EnrollmentCreateView(generics.CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

class ReviewCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer