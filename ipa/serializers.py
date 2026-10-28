from rest_framework import serializers
from .models import Mahsulot, Website


class MahsulotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mahsulot
        fields = "__all__"


class WebsiteSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='site_id')
    categoryLabel = serializers.CharField(source='category_label')
    targetAudience = serializers.CharField(source='target_audience', required=False, allow_blank=True)
    freePlanDetails = serializers.CharField(source='free_plan_details', required=False, allow_blank=True)
    paidPlanDetails = serializers.CharField(source='paid_plan_details', required=False, allow_blank=True)
    foundedYear = serializers.IntegerField(source='founded_year', required=False, allow_null=True)

    class Meta:
        model = Website
        fields = [
            'id',
            'name',
            'url',
            'category',
            'categoryLabel',
            'description',
            'features',
            'pricing',
            'tags',
            'rating',
            'targetAudience',
            'freePlanDetails',
            'paidPlanDetails',
            'pros',
            'cons',
            'alternatives',
            'foundedYear',
            'company',
        ]
