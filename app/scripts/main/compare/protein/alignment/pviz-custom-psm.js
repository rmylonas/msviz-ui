'use strict';
angular.module('pviz-custom-psm', ['thirdparties', 'environment', 'fishtones-wrapper'])

  .service('pvizCustomPsm', function (_, pviz) {
    pviz.FeatureDisplayer.trackHeightPerCategoryType.psms = 0.4;

    pviz.FeatureDisplayer.setCustomHandler('psm', {
      appender: function (viewport, svgGroup, features, type) {
        var sel = svgGroup.selectAll('g.feature.internal.data.' + type)
          .data(features)
          .enter()
          .append('g')
          .attr('class', 'feature internal data ' + type);
        sel.append('line');

        sel.selectAll('circle')
          .data(function (psm) {
            return psm.modif;
          })
          .enter()
          .append('circle')
          .attr({
            r: 2,
            class: function (m) {
              if(m.modifRank === 'first'){
                return 'is-first';
              }else if(m.modifRank === 'firstWithConflict'){
                return 'is-firstWithConflict';
              }
              return '';
            }
          });
        return sel;
      },
      positioner: function (viewport, d3selection) {
        d3selection.attr('transform', function (ft) {
          return 'translate(0,' + 0.4 * viewport.scales.y(0.5 + ft.displayTrack) + ')';
        });

        d3selection.selectAll('line')
          .attr('x1', function (ft) {
            return viewport.scales.x(ft.start - 0.4) + 1;
          })
          .attr('x2', function (ft) {
            return viewport.scales.x(ft.end + 0.4);
          });
        d3selection.selectAll('circle')
          .attr('cx', function (ft) {
            return viewport.scales.x(ft.pos);
          });
        return d3selection;
      }
    });

    pviz.FeatureDisplayer.setCustomHandler('psmIsoModif', {
      appender: function (viewport, svgGroup, features, type) {
        var sel = svgGroup.selectAll('g.feature.internal.data.' + type)
          .data(features)
          .enter()
          .append('g')
          .attr('class', 'feature internal data ' + type);
        sel.append('line');


        sel.selectAll('circle')
          .data(function (psm) {
            return _.filter(psm.modif, function (m) {
              return m.isFix;
            });
          })
          .enter()
          .append('circle')
          .attr({
            r: 2,
            class: function (m) {
              return m.isTarget ? 'is-target' : '';
            }
          });
        sel.selectAll('path')
          .data(function (psm) {
            return _.filter(psm.modif, function (m) {
              return m.isVar;
            });
          })
          .enter()
          .append('g')
          .attr('class', 'fixModif')
          .append('path')
          .attr({
            d: 'M0,-3,L3,3,L-3,3L0,-3',
            class: function (m) {
              return m.isTarget ? 'is-target' : '';
            }
          });
        return sel;
      },
      positioner: function (viewport, d3selection) {
        d3selection.attr('transform', function (ft) {
          return 'translate(0,' + 0.4 * viewport.scales.y(0.5 + ft.displayTrack) + ')';
        });

        d3selection.selectAll('line')
          .attr('x1', function (ft) {
            return viewport.scales.x(ft.start - 0.4) + 1;
          })
          .attr('x2', function (ft) {
            return viewport.scales.x(ft.end + 0.4);
          });
        d3selection.selectAll('circle')
          .attr('cx', function (ft) {
            return viewport.scales.x(ft.pos);
          });
        d3selection.selectAll('g.fixModif')
          .attr('transform', function (ft) {
            return 'translate(' + viewport.scales.x(ft.pos) + ',0)';
          });
        return d3selection;
      }
    });

    pviz.FeatureDisplayer.setCustomHandler('ptmCount', {
      appender: function (viewport, svgGroup, features, type) {
        var sel = svgGroup.selectAll('g.feature.internal.data.' + type)
          .data(features)
          .enter()
          .append('g')
          .attr('class', 'feature internal data ' + type);
        sel.append('line')
          .style('stroke-width', function (aai) {
            var d = aai.data.depth;
            if(d <= 2){
              return d;
            }
            if (d <= 9) {
              return d/2 + 1;
            }
            return d/4 + 3.5;
          });
        sel.filter(function (aai) {
          return aai.data.nbTargetModification;
        })
          .classed('has-target-modif', true)
          .append('circle')
          .attr('r', function(r){
            var nrModif = r.data.nbTargetModification;
            if(nrModif === 1){
              return 2;
            }
            return nrModif >= 10 ? 15 : nrModif * 1.5;
          });

        return sel;
      },
      positioner: function (viewport, d3selection) {
        d3selection.attr('transform', function (ft) {
          return 'translate(0,' + 0.4 * viewport.scales.y(0.5 + ft.displayTrack) + ')';
        });

        d3selection.selectAll('line')
          .attr('x1', function (ft) {
            return viewport.scales.x(ft.start - 0.5);
          })
          .attr('x2', function (ft) {
            return viewport.scales.x(ft.end + 0.5);
          });
        d3selection.selectAll('circle')
          .attr('cx', function (ft) {
            return viewport.scales.x(ft.start);
          });
        return d3selection;
      }
    });

    pviz.FeatureDisplayer.setCustomHandler('aaInfo', {
      appender: function (viewport, svgGroup, features, type) {
        var sel = svgGroup.selectAll('g.feature.internal.data.' + type)
          .data(features)
          .enter()
          .append('g')
          .attr('class', 'feature internal data ' + type);
        sel.append('line')
          .style('stroke-width', function (aai) {
            var d = aai.data.depth;
            if(d <= 2){
              return 1;
            }
            if (d <= 4) {
              return d/2;
            }
            return d/4;
          });
        sel.filter(function (aai) {
          return aai.data.nbTargetModification;
        })
          .classed('has-target-modif', true)
          .append('circle')
          .attr('r', 5);
        return sel;
      },
      positioner: function (viewport, d3selection) {
        d3selection.attr('transform', function (ft) {
          return 'translate(0,' + 0.4 * viewport.scales.y(0.5 + ft.displayTrack) + ')';
        });

        d3selection.selectAll('line')
          .attr('x1', function (ft) {
            return viewport.scales.x(ft.start - 0.5);
          })
          .attr('x2', function (ft) {
            return viewport.scales.x(ft.end + 0.5);
          });

        return d3selection;
      }
    });


    pviz.FeatureDisplayer.setCustomHandler('aaModif', {
      appender: function (viewport, svgGroup, features, type) {
        var sel = svgGroup.selectAll('g.feature.internal.data.' + type)
          .data(features)
          .enter()
          .append('g')
          .attr({
            'class': 'feature internal data ' + type
          })
          .style('transform', 'rotate(-90deg)');
        sel.append('text')
          .text(function (aa) {
            return aa.text;
          })
          .attr('x', -viewport.scales.y(0.9));
        return sel;
      },
      positioner: function (viewport, d3selection) {
        d3selection.selectAll('text')
          .attr('y', function (ft) {
            return viewport.scales.x(ft.start);
          });
        return d3selection;
      }
    });
  });

