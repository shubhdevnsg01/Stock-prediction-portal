from django.urls import path,include
from accounts import views as UserViews
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView
from .views import StockPrediction

urlpatterns = [
    path('register/',UserViews.RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected-view/',UserViews.ProtectedView.as_view()),
    path('predict/',StockPrediction.as_view(), name='Stock-prediction')
]