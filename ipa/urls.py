from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MahsulotViewSet, WebsiteViewSet

router = DefaultRouter()
router.register("mahsulot", MahsulotViewSet, basename="mahsulot")
router.register("websites", WebsiteViewSet, basename="websites")

urlpatterns = [
    path("", include(router.urls)),
]
