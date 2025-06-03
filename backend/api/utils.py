import matplotlib.pyplot as plt
import os
from django.conf import settings

def save_plot(plot_image_path):
    image_path=os.path.join(settings.MEDIA_ROOT,plot_image_path)
    plt.savefig(image_path)
    plt.close()
    image_url=settings.MEDIA_URL+ plot_image_path
    return image_url