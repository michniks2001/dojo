from .models import WaitingListItem
from rest_framework import serializers


class WaitingListItemSerializer(serializers.ModelSerializer):
    referred_by = serializers.CharField(required=False, allow_null=True)

    class Meta:
        model = WaitingListItem
        fields = [
            'email',
            'name',
            'interests',
            'referral_code',
            'referred_by',
        ]

        extra_kwargs = {
            'referral_code': {'read_only': True},
        }
        
    def validate_interests(self, value):
        valid_interests = [choice[0] for choice in WaitingListItem.INTERESTS]

        for interest in value:
            if interest not in valid_interests:
                raise serializers.ValidationError(f'Invalid interest: {interest}')
        return value

    def validate_referred_by(self, value):
        if value:
            try:
                referrer = WaitingListItem.objects.get(referral_code=value)
                return referrer
            except WaitingListItem.DoesNotExist:
                raise serializers.ValidationError(f'Invalid referral code: {value}')
        return None

    def create(self, validated_data):
        referred_by = validated_data.pop('referred_by', None)

        instance = WaitingListItem.objects.create(**validated_data)

        if referred_by:
            instance.referred_by = referred_by
            instance.save()

        return instance
