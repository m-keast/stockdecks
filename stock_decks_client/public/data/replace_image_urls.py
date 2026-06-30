import pandas as pd

# ── Configuration ────────────────────────────────────────────────────────────

INPUT_CSV  = "companies.csv"   # path to your input CSV
OUTPUT_CSV = "companies.csv"      # path to write the updated CSV

# Only rows whose current Image_URL matches this value will be updated
REPLACE_ONLY_IF_URL = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Disambig_gray.svg/40px-Disambig_gray.svg.png"

# Add or edit entries to match your exact Sector values (case-sensitive)
SECTOR_IMAGE_URLS = {
    "Technology":           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUnp_o1B7o7VV6S-ONl1qcf5mDeBvcWYO9l5AqvEhIdg&s=10",
    "Health Care":          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDs5uDrP0691zfDjcBMLm_NkY1ktIAjvX-mPndY2V5CQ&s=10",
    "Finance":              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFfazbozsqKWsp5Oy3_X41L1RJknakGXcq1ieHq3LPQ&s=10",
    "Consumer Discretionary": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyVBQBnn2VAnKFYK0tJTDBD6ssmovzAD0R3Ioan20PzA&s=10",
    "Consumer Staples":    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiHISgmO5jk-cZgvQkPIWdq0elLKc24oeJR8-k1VAcJw&s=10",
    "Energy":              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCLVviBYNua1ivxBPZ3K7d3tmGlzjegEVWGMFlfepyXg&s=10",
    "Industrials":         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUwzNfDdP59a0hHQabrxFhsW3VNWjgMh4_Lvk85NTb1g&s=10",
    "Basic Materials":     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP9R_qyMeJ7_Fqngw_Y4xsAp3WKBbgXR96HXqKHyXh_g&s=10",
    "Utilities":           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2uT7J9DspkQHPAgaitzf5nGPDVvL-gO-vodQFEHISJw&s=10",
    "Real Estate":         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2aDsH-LSe7EQlyKk_sKcmvqtqtMX10aFyzsSaD19vdA&s=10",
    "Telecommunications":  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlG4FbTaq3muKdbYetab6yYGh0Thm_rBPjwQ&s",
    "Miscellaneous":         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMK5GRl1EVD3gdR1jnZwWfCVVce-kSA3vWdzsOPZ0I_A&s=10"
}

# ── Script ───────────────────────────────────────────────────────────────────

df = pd.read_csv(INPUT_CSV)

unmapped = set(df["Sector"].dropna().unique()) - set(SECTOR_IMAGE_URLS.keys())
if unmapped:
    print(f"Warning: these sectors have no URL mapped and will be left unchanged: {unmapped}")

mask = df["Image_URL"] == REPLACE_ONLY_IF_URL
df.loc[mask, "Image_URL"] = df.loc[mask, "Sector"].map(SECTOR_IMAGE_URLS).fillna(df.loc[mask, "Image_URL"])

df.to_csv(OUTPUT_CSV, index=False)
print(f"Done — saved to {OUTPUT_CSV}")
