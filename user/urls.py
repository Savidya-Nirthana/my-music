from django.urls import path
from .views import login_view, signup_view, index


urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('home/', index, name='index')
]

