import os
from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):
    DEBUG = int(os.environ.get("DEBUG", default=1))

    def get_email_confirmation_url(self, request, emailconfirmation):

        """
            Changing the confirmation URL to fit the domain that we are working on
        """

        url = (
            "https://example.com/verify-account/"
            + emailconfirmation.key
        )
        return url