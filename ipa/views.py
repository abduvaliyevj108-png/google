from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Mahsulot, Website
from .serializers import MahsulotSerializer, WebsiteSerializer


class MahsulotViewSet(ModelViewSet):
    queryset = Mahsulot.objects.all().order_by("-id")
    serializer_class = MahsulotSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data,
            many=isinstance(request.data, list)
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class WebsiteViewSet(ModelViewSet):
    queryset = Website.objects.all().order_by("id")
    serializer_class = WebsiteSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data,
            many=isinstance(request.data, list)
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
