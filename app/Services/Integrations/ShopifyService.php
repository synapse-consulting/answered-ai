<?php

namespace App\Services\Integrations;

use Illuminate\Support\Facades\Http;

class ShopifyService
{
    protected string $shopUrl;
    protected string $accessToken;

    public function __construct()
    {
        $this->shopUrl = config('constants.SHOPIFY_DOMAIN'); 
        $this->accessToken = config('constants.SHOPIFY_ACCESS_TOKEN');
    }

    /**
     * Send GraphQL query or mutation
     */
    protected function graphql(string $query, array $variables = []): array
    {
        $response = Http::withHeaders([
            'X-Shopify-Access-Token' => $this->accessToken,
            'Content-Type' => 'application/json',
        ])->post("https://{$this->shopUrl}/admin/api/2025-01/graphql.json", [
            'query' => $query,
            'variables' => $variables,
        ]);

        if ($response->failed()) {
            throw new \Exception('Shopify API error: ' . $response->body());
        }

        return $response->json();
    }

    /**
     * Create an order
     */
    public function createOrder(array $orderData): array
    {
        $query = <<<GRAPHQL
        mutation createOrder(\$input: OrderInput!) {
          orderCreate(input: \$input) {
            order {
              id
              name
              customer {
                firstName
                lastName
                email
              }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                  }
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }
        GRAPHQL;

        return $this->graphql($query, ['input' => $orderData]);
    }

    /**
     * Get order details by ID
     */
    public function getOrder(string $orderId): array
    {
        $query = <<<GRAPHQL
        query getOrder(\$id: ID!) {
          order(id: \$id) {
            id
            name
            createdAt
            totalPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            customer {
              firstName
              lastName
              email
            }
          }
        }
        GRAPHQL;

        return $this->graphql($query, ['id' => $orderId]);
    }

    /**
     * Get products
     */
    public function getProducts(int $first = 10): array
    {
        $query = <<<GRAPHQL
        query getProducts(\$first: Int!) {
          products(first: \$first) {
            edges {
              node {
                id
                title
                description
                variants(first: 5) {
                  edges {
                    node {
                      id
                      title
                      price
                    }
                  }
                }
              }
            }
          }
        }
        GRAPHQL;

        return $this->graphql($query, ['first' => $first]);
    }

    /**
     * Get sales data (orders with totals)
     */
    public function getSalesData(string $from, string $to, int $first = 10): array
    {
        $query = <<<GRAPHQL
        query getSales(\$first: Int!, \$from: DateTime, \$to: DateTime) {
          orders(first: \$first, query: "created_at:>=\$from created_at:<=\$to") {
            edges {
              node {
                id
                name
                createdAt
                totalPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        GRAPHQL;

        return $this->graphql($query, [
            'first' => $first,
            'from'  => $from,
            'to'    => $to,
        ]);
    }
}
