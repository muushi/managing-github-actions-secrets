# Small cheatsheet for managing GitHub Actions Secrets

## Creating or updating GitHub Actions secrets
1) Create a personal access token (PAT) ([link to tutorial](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens))  
*\* You can use either a classic PAT with the `repo` scope or a fine-grained PAT. If you're working with a repo within a GitHub organisation, it might not have fine-grained PATs enabled as they are currently (08/23) in beta.*
2) Fetch the repository public key ([docs](https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28#get-a-repository-public-key))  
3) Add the `key` value to your .env file as `REPOSITORY_PUBLICKEY`
4) Retrieve your encrypted secret value with `SECRET_UNENCRYPTED=<your-secret> npm run encrypt`
5) Create or update your secret with the GitHub API ([docs](https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28#create-or-update-a-repository-secret))  
*\* The `encrypted_value` in request body is the encrypted secret in step 4, the `key_id` value is the `key_id` value returned in step 2 from fetching the repo public key.*
6) Add the secret to your GitHub Actions workflow where needed ([docs](https://docs.github.com/en/actions/security-guides/encrypted-secrets#using-encrypted-secrets-in-a-workflow))
7) All done!