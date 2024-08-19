export type FormattedAssetAmount = {
  commitment_asset_class: string
  commitment_amount: number
}

export type Commitment = {
  id: number
  commitment_asset_class: string
  commitment_currency: string
  commitment_amount: number
}

export type Investor = {
  id: number
  investor_name: string
  investory_type: string
  investor_country: string
  investor_date_added: Date
  investor_last_updated: Date
  commitment_amount: number
}