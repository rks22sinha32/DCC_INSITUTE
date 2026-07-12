from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Custom admin class banayenge taaki humare naye fields dikh sakein
class CustomUserAdmin(UserAdmin):
    model = User
    # Default fields ke sath hum 'Custom Fields' section add kar rahe hain
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('role', 'phone')}),
    )

# Ab is custom admin ko register karenge
admin.site.register(User, CustomUserAdmin)