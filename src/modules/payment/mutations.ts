import { gql } from "apollo-server-core";
import { mutationField } from "nexus";
import { executor } from "../../schema";
import { NEXT_PUBLIC_SHOPIFY_API_KEY } from "../../setup";

const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription($returnUrl: URL!) {
    appSubscriptionCreate(
      name: "Super plan"
      test: true
      trialDays: 7
      returnUrl: $returnUrl
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              price: { amount: 10, currencyCode: USD }
              interval: EVERY_30_DAYS
            }
          }
        }
      ]
    ) {
      appSubscription {
        id
      }
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`;

export const createPayment = mutationField("createPayment", {
  type: "String",
  resolve: async (_root, _args, context) => {
    const returnUrl = `https://${context.store.shop}/admin/apps/${NEXT_PUBLIC_SHOPIFY_API_KEY}/success?shop=${context.store.shop}`;
    const resp = await executor({
      document: CREATE_SUBSCRIPTION,
      variables: { returnUrl },
      context,
    });
    const paymentUrl = resp.data?.appSubscriptionCreate?.confirmationUrl.split(
      ".com/admin",
    )[1];
    return paymentUrl;
  },
});
