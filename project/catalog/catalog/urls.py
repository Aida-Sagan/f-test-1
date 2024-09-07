from django.urls import path

from catalog.views import ProductsListView
from catalog import views

app_name = 'catalog'

urlpatterns = [
    path('catalog/', ProductsListView.as_view(), name='products_list'),
    path('catalog/<int:pk>/', views.delete_product, name='delete_product'),
]
