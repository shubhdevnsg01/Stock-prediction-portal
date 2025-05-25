from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializers(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,min_length=8,style={'input_type':'password'})#so that get request does not work for password
    class Meta:
        model=User
        fields=["username","email","password",]

    def create(self,validated_data):
        user=User.objects.create_user( #create_user is used so it hashes the password
            **validated_data
        )

        return user
