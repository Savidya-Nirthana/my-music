from django.shortcuts import render, redirect
from .models import Profile
from django.contrib.auth.models import User
from django.contrib.auth import login ,authenticate
from django.contrib import messages
from django.views.decorators.csrf import csrf_protect

# Create your views here.

@csrf_protect
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user_1 = authenticate(request, username=username, password = password)

        if user_1 is not None:
            login(request, user_1)
            profile = Profile.objects.get(user=user_1)
            name = profile.user.username  # Get the username from the profile
            name = profile.user.first_name
            return redirect(f'/home/?name={name}')

        else:
            messages.error(request, 'invalid username or password')
    else:
        return render(request, 'login.html')

def signup_view(request):
    if request.method == 'POST':
        first_name = request.POST['first-name']
        last_name = request.POST['last-name']
        email = request.POST['email']
        date_of_birth = request.POST['dob']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        # agreement = request.POST.get('agreement', False)

        if password1 == password2:
            if User.objects.filter(username = email).exists():
                messages.error(request, "Email already exists!")
            else:
                user = User.objects.create_user(username=email, email=email, password=password1, first_name=first_name, last_name=last_name)
                profile = Profile.objects.create(user=user, birth_date = date_of_birth)
                profile.save()
                return redirect('login')
        
        else:
            messages.error(request, 'password do not match')

    return render(request, 'signup.html')

