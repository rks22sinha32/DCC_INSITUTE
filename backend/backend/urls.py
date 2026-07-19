from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import RegisterView
from courses.views import (
    CourseListCreateView, CourseDetailView, EnrollmentCreateView, 
    ReviewCreateView, BatchList, NoticeList
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Auth
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    
    # Courses, Enrollment & Reviews
    path('api/courses/', CourseListCreateView.as_view(), name='course-list'),
    path('api/courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path('api/enroll/', EnrollmentCreateView.as_view(), name='enroll'),
    path('api/reviews/', ReviewCreateView.as_view(), name='add-review'),
    
    # Batches & Notices (Jo naye banaye the)
    path('api/batches/', BatchList.as_view(), name='batch-list'),
    path('api/notices/', NoticeList.as_view(), name='notice-list'),
]