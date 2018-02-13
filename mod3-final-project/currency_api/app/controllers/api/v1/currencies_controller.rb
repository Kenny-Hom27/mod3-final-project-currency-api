class Api::V1::CurrenciesController < ApplicationController

  def index
    @currencies = Currency.all
    render json: @currencies
  end

  def create
    @currency = Currency.create(currency_params)
    render json: @currency
  end

  def destroy
    @currency = Currency.find(params[:id])
    @currency.destroy

  end

  def update
    @currency = Currency.find(params[:id])

    @currency.update(currency_params)
    if @currency.save
      render json: @currency
    else
      render json: {errors: @currency.errors.full_messages}, status: 422
    end
  end

  private
  def currency_params
    params.permit(:original_currency, :conversion_currency, :amount_entered)
  end


end
