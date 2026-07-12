from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import RegisterView
from courses.views import CourseListCreateView, CourseDetailView # <-- CourseDetailView add kiya yahan

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    
    # Ye humara saare Courses dekhne ka API link hai
    path('api/courses/', CourseListCreateView.as_view(), name='course-list'),
    
    # Ye humara naya ek single Course (aur uske chapters) dekhne ka link hai 👇
    path('api/courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
]