import os
from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):
    BASE_URL = os.environ.get("FRONTEND_APP_NAME")

    def get_email_confirmation_url(self, request, emailconfirmation):
        """
            Changing the confirmation URL to fit the domain that we are working on
        """

        url = (
                os.environ.get("FRONTEND_APP_NAME") + "user-activate/"
                + emailconfirmation.key
        )
        return url
