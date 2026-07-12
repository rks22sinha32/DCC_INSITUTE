from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'phone']
        # Password ko hide karne ke liye (taaki API response mein password na dikhe)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Naya user create karne aur password ko encrypt (hash) karne ka logic
        user = User.objects.create_user(**validated_data)
        return user