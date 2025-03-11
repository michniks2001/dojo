from django.contrib import admin
from django import forms

from .models import WaitingListItem


class WaitingListItemAdminForm(forms.ModelForm):
    interests = forms.MultipleChoiceField(
        choices=WaitingListItem.INTERESTS,
        widget=forms.CheckboxSelectMultiple,
        required=False
    )


@admin.register(WaitingListItem)
class WaitingListItemAdmin(admin.ModelAdmin):
    form = WaitingListItemAdminForm
    list_display = ('email', 'name', 'interests', 'timestamp', 'referral_code', 'referred_by')
    search_fields = ('email', 'name')