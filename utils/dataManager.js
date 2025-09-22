import { v4 as uuidv4 } from 'uuid';

// Data storage utility for browser localStorage
export class DataStorage {
  static KEYS = {
    SESSIONS: 'raceMetrics_sessions',
    CAR_SETTINGS: 'raceMetrics_carSettings',
    PERFORMANCE_DATA: 'raceMetrics_performanceData'
  };

  static saveData(key, data) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  static loadData(key, defaultValue = null) {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    }
    return defaultValue;
  }

  static clearData(key) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}

// Session management
export class SessionManager {
  static createSession(sessionData) {
    const session = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...sessionData
    };

    const sessions = this.getAllSessions();
    sessions.push(session);
    DataStorage.saveData(DataStorage.KEYS.SESSIONS, sessions);
    
    return session;
  }

  static getAllSessions() {
    return DataStorage.loadData(DataStorage.KEYS.SESSIONS, []);
  }

  static getSession(id) {
    const sessions = this.getAllSessions();
    return sessions.find(session => session.id === id);
  }

  static updateSession(id, updateData) {
    const sessions = this.getAllSessions();
    const index = sessions.findIndex(session => session.id === id);
    
    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...updateData, updatedAt: new Date().toISOString() };
      DataStorage.saveData(DataStorage.KEYS.SESSIONS, sessions);
      return sessions[index];
    }
    
    return null;
  }

  static deleteSession(id) {
    const sessions = this.getAllSessions();
    const filtered = sessions.filter(session => session.id !== id);
    DataStorage.saveData(DataStorage.KEYS.SESSIONS, filtered);
  }
}

// Performance data management
export class PerformanceDataManager {
  static savePerformanceData(sessionId, dataPoint) {
    const performanceData = DataStorage.loadData(DataStorage.KEYS.PERFORMANCE_DATA, {});
    
    if (!performanceData[sessionId]) {
      performanceData[sessionId] = [];
    }
    
    const dataWithTimestamp = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      ...dataPoint
    };
    
    performanceData[sessionId].push(dataWithTimestamp);
    DataStorage.saveData(DataStorage.KEYS.PERFORMANCE_DATA, performanceData);
    
    return dataWithTimestamp;
  }

  static getPerformanceData(sessionId) {
    const performanceData = DataStorage.loadData(DataStorage.KEYS.PERFORMANCE_DATA, {});
    return performanceData[sessionId] || [];
  }

  static getAllPerformanceData() {
    return DataStorage.loadData(DataStorage.KEYS.PERFORMANCE_DATA, {});
  }

  static deletePerformanceData(sessionId) {
    const performanceData = DataStorage.loadData(DataStorage.KEYS.PERFORMANCE_DATA, {});
    delete performanceData[sessionId];
    DataStorage.saveData(DataStorage.KEYS.PERFORMANCE_DATA, performanceData);
  }
}

// Car settings management
export class CarSettingsManager {
  static saveCarSettings(settings) {
    const carSettings = {
      id: uuidv4(),
      savedAt: new Date().toISOString(),
      ...settings
    };
    
    const allSettings = this.getAllCarSettings();
    allSettings.push(carSettings);
    DataStorage.saveData(DataStorage.KEYS.CAR_SETTINGS, allSettings);
    
    return carSettings;
  }

  static getAllCarSettings() {
    return DataStorage.loadData(DataStorage.KEYS.CAR_SETTINGS, []);
  }

  static getCarSettings(id) {
    const settings = this.getAllCarSettings();
    return settings.find(setting => setting.id === id);
  }

  static deleteCarSettings(id) {
    const settings = this.getAllCarSettings();
    const filtered = settings.filter(setting => setting.id !== id);
    DataStorage.saveData(DataStorage.KEYS.CAR_SETTINGS, filtered);
  }
}

// Data analysis utilities
export class DataAnalyzer {
  static analyzeLapTimes(performanceData) {
    const lapTimes = performanceData
      .filter(data => data.lapTime)
      .map(data => parseFloat(data.lapTime))
      .filter(time => !isNaN(time));

    if (lapTimes.length === 0) return null;

    const avg = lapTimes.reduce((sum, time) => sum + time, 0) / lapTimes.length;
    const best = Math.min(...lapTimes);
    const worst = Math.max(...lapTimes);
    
    return { average: avg, best, worst, count: lapTimes.length };
  }

  static analyzeTirePressures(performanceData) {
    const tireData = performanceData.filter(data => data.tirePressures);
    
    if (tireData.length === 0) return null;

    const analysis = {
      frontLeft: [],
      frontRight: [],
      rearLeft: [],
      rearRight: []
    };

    tireData.forEach(data => {
      if (data.tirePressures) {
        analysis.frontLeft.push(parseFloat(data.tirePressures.frontLeft) || 0);
        analysis.frontRight.push(parseFloat(data.tirePressures.frontRight) || 0);
        analysis.rearLeft.push(parseFloat(data.tirePressures.rearLeft) || 0);
        analysis.rearRight.push(parseFloat(data.tirePressures.rearRight) || 0);
      }
    });

    const avgPressures = {};
    Object.keys(analysis).forEach(tire => {
      const pressures = analysis[tire].filter(p => p > 0);
      avgPressures[tire] = pressures.length > 0 
        ? pressures.reduce((sum, p) => sum + p, 0) / pressures.length 
        : 0;
    });

    return avgPressures;
  }

  static generateRecommendations(sessionData, performanceData) {
    const recommendations = [];
    const lapAnalysis = this.analyzeLapTimes(performanceData);
    const tireAnalysis = this.analyzeTirePressures(performanceData);

    // Lap time recommendations
    if (lapAnalysis && lapAnalysis.count > 3) {
      const consistency = (lapAnalysis.worst - lapAnalysis.best) / lapAnalysis.average;
      
      if (consistency > 0.05) {
        recommendations.push({
          category: 'Consistency',
          message: 'Lap times show high variance. Focus on consistent driving and setup.',
          priority: 'high',
          data: lapAnalysis
        });
      }
    }

    // Tire pressure recommendations
    if (tireAnalysis) {
      const avgPressure = Object.values(tireAnalysis).reduce((sum, p) => sum + p, 0) / 4;
      
      if (avgPressure < 28) {
        recommendations.push({
          category: 'Tire Pressure',
          message: 'Consider increasing tire pressures for better handling.',
          priority: 'medium',
          data: tireAnalysis
        });
      } else if (avgPressure > 35) {
        recommendations.push({
          category: 'Tire Pressure',
          message: 'Consider reducing tire pressures for better grip.',
          priority: 'medium',
          data: tireAnalysis
        });
      }
    }

    return recommendations;
  }
}