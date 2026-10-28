from django.db import models


class Mahsulot(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Website(models.Model):
    site_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=150)
    url = models.URLField(max_length=500)
    category = models.CharField(max_length=50)
    category_label = models.CharField(max_length=100)
    description = models.TextField()
    features = models.JSONField(default=list, blank=True)
    pricing = models.CharField(max_length=50)  # Bepul, Freemium, Pullik
    tags = models.JSONField(default=list, blank=True)
    rating = models.FloatField(default=5.0)

    target_audience = models.TextField(blank=True, default='')
    free_plan_details = models.TextField(blank=True, default='')
    paid_plan_details = models.TextField(blank=True, default='')
    pros = models.JSONField(default=list, blank=True)
    cons = models.JSONField(default=list, blank=True)
    alternatives = models.JSONField(default=list, blank=True)
    founded_year = models.IntegerField(null=True, blank=True)
    company = models.CharField(max_length=150, blank=True, default='')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
