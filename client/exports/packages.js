import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link, withRouter } from "react-router-dom";
import thunk from 'redux-thunk';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import autosize from 'autosize';
import { Holdable, defineHold } from 'react-touch';

export {
  React, Component, connect, Provider,
  combineReducers, createStore, applyMiddleware, compose,
  ReactDOM, BrowserRouter, Route, Link,
  withRouter, thunk, axios, SwipeableViews,
  autosize, Holdable, defineHold
}
