from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.views.generic import ListView
from catalog.models import Product


class ProductsListView(ListView):
    model = Product
    template_name = 'catalog/products_list.html'
    context_object_name = 'products'
#     queryset = Product.objects.filter(is_active=True)


@csrf_exempt
def delete_product(request, pk):
    if request.method == 'POST':
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            product = get_object_or_404(Product, pk=pk)
            product.is_active = False
            product.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False}, status=400)
    return JsonResponse({'success': False}, status=400)
