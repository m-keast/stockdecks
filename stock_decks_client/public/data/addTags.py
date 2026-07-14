
import pandas as pd

# Load the CSV files
companies = pd.read_csv('companies.csv')
constituents = pd.read_csv('constituents.csv')

# Convert constituent symbols to a set for fast lookup (assumes column name is 'Symbol')
sp_symbols = set(constituents['Symbol'].dropna().str.strip().str.upper())

# Normalize company symbols to match correctly
comp_symbols = companies['Symbol'].astype(str).str.strip().str.upper()

# Create the Tags column: 'sp' if it matches the set, otherwise empty
companies['Tags'] = comp_symbols.apply(lambda x: 'sp' if x in sp_symbols else '')

# Save the updated file
companies.to_csv('companies_updated.csv', index=False)