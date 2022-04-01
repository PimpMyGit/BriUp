import os
import pandas as pd

from flask import Flask, render_template, request, make_response, jsonify

app = Flask(__name__, template_folder='static')

df_prenotazioni = 'prenotazioni.csv'

@app.route('/')
def hello_world():
   return render_template('base.html')

@app.route('/confermaPrenotazione', methods=['POST'])
def postmethod():
   response = None
   try:
      data = request.get_json()
      prenotazione = pd.DataFrame([list(data.values())], columns=list(data.keys())) 
      prenotazione.to_csv(df_prenotazioni, mode='a', header=not os.path.exists(df_prenotazioni), index=False)

      response = make_response(jsonify({'exit':'OK', 'message':'Prenotazione effettuata. Bellaaaa!!'}), 200)
   except:
      response = make_response(jsonify({'exit':'OK', 'message':'Qualcosa è andato storto. Riprova tra poco please.'}), 500) 
   return response

if __name__ == '__main__':
   app.run()