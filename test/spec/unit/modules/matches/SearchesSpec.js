'use strict';

describe('searches', function () {
  var SearchSet, EnvConfig;
  var $httpBackend, $rootScope, _;

  beforeEach(module('matches-search'));
  beforeEach(module('environment'));
  beforeEach(module('thirdparties'));

  beforeEach(inject(function ($injector) {
    // Set up the mock http service responses

    SearchSet = $injector.get('SearchSet');
    EnvConfig = $injector.get('EnvConfig');

    _ = $injector.get('_');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');

    EnvConfig.backendUrl = 'http://pipo.com/backend';
    $httpBackend.when('GET', 'http://pipo.com/backend/')
      .respond(prout);
  }));

  describe('SearchIdSet', function () {
    var paf = {searchId: 'PAF'};
    var paf2 = {searchId: 'PAF'};
    var pif = {searchId: 'PIF'};
    var pif2 = {searchId: 'PIF'};
    var pof = {searchId: 'POF'};


    it('constructor', function () {
      expect(SearchSet).not.toBeUndefined();
    });

    it('size', function () {
      var set = new SearchSet();
      expect(set.size()).toBe(0);

      set.add(paf);
      expect(set.size()).toBe(1);

      set.add('pif');
      expect(set.size()).toBe(2);

      set.add(paf2);
      expect(set.size()).toBe(2);
    });

    it('add multiple', function () {
      var set = new SearchSet();
      expect(set.size()).toBe(0);

      set.add([paf, pif, pof, pif2]);
      expect(set.size()).toBe(3);
    });

    it('clear', function () {
      var set = new SearchSet().add([paf, pif, pof, pif2]);
      expect(set.size()).toBe(3);
      set.clear();
      expect(set.size()).toBe(0);
    });

    it('remove', function () {
      var set = new SearchSet().add([paf, pif, pof, pif2]);
      expect(set.size()).toBe(3);
      set.remove(pif);
      expect(set.size()).toBe(2);

    });

    it('listIds as list', function () {
      var set = new SearchSet().add([paf, pof, pif]);
      expect(set.listIds()).toEqual(['PAF', 'PIF', 'POF']);
    });

    it('listIds(",") gives a string', function () {
      var set = new SearchSet().add([paf, pof, pif]);
      expect(set.listIds(',')).toEqual('PAF,PIF,POF');
    });
  });


  var prout = {
    centric: 'SNP'
  };
});
