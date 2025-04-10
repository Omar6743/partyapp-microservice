// exceptions/EventoNoDisponibleException.js
class EventoNoDisponibleException extends Error {
    constructor(message) {
      super(message);
      this.name = 'EventoNoDisponibleException';
    }
  }
  
  module.exports = EventoNoDisponibleException;
  