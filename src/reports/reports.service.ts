import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from 'src/booking/schema/booking.schema';
import {
  LipaNaMpesaTransaction,
  LipaNaMpesaTransactionDocument,
} from 'src/lipa-na-mpesa/schema/lipa-na-mpesa.schema';
import { Parcel, PercelDocument } from 'src/percel/schema/percel.schema';
import { JwtPayload } from 'src/types/jwt-payload';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Parcel.name)
    private readonly percelModel: Model<PercelDocument>,
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
    @InjectModel(LipaNaMpesaTransaction.name)
    private readonly lipaNaMpesaTransactionModel: Model<LipaNaMpesaTransactionDocument>,
  ) {}

  // Agents: Parcels, Bookings and Transactions with sendingAgent/agent field == agent.sub
  async findAgentParcelReport(agent: JwtPayload, date: string) {
    try {
      const { startOfDay, endOfDay } = this.calculateDateRange(date);

      const agentParcelsReport = await this.percelModel.find({
        sendingAgent: agent.sub,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

      return agentParcelsReport;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ??
          'Something went wrong while fetching your parcels report',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAgentBookingsReport(agent: JwtPayload, date: string) {
    try {
      const { startOfDay, endOfDay } = this.calculateDateRange(date);

      const agentBookingsReport = await this.bookingModel.find({
        sendingAgent: agent.sub,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

      return agentBookingsReport;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ??
          'Something went wrong while fetching your bookings report',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAgentCollectionsReport(agent: JwtPayload, date: string) {
    try {
      const { startOfDay, endOfDay } = this.calculateDateRange(date);

      const agentCollectionsReport =
        await this.lipaNaMpesaTransactionModel.find({
          agent: agent.sub,
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        });

      return agentCollectionsReport;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ??
          'Something went wrong while fetching your money collections report',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Station-Managers: Parcels, Bookings and Transactions with sendingStation/station field == manager.user_metadata.station
  async findManagerParcelReport(manager: JwtPayload, date: string) {
    try {
      const { startOfDay, endOfDay } = this.calculateDateRange(date);

      const managerParcelsReports = await this.percelModel
        .find({
          sendingStation: manager.user_metadata.station,
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        })
        .populate('sendingStation', 'name');

      return managerParcelsReports;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ??
          `Something went wrong while fetching your station's parcels reports`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findManagerBookingsReport(manager: JwtPayload, date: string) {
    try {
      const { startOfDay, endOfDay } = this.calculateDateRange(date);

      const managerBookingsReports = await this.bookingModel
        .find({
          sendingStation: manager.user_metadata.station,
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        })
        .populate('sendingStation', 'name');

      return managerBookingsReports;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ??
          `Something went wrong while fetching your station's bookings reports`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findManagerCollectionsReport(manager: JwtPayload, date: string) {
    try {
      const { startOfDay, endOfDay } = this.calculateDateRange(date);

      const managerCollectionsReports = await this.lipaNaMpesaTransactionModel
        .find({
          station: manager.user_metadata.station,
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        })
        .populate('sendingStation', 'name');

      return managerCollectionsReports;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ??
          `Something went wrong while fetching your station's money collections reports`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Sacco admins or General Admins: Parcels, Bookings and Transactions with sendingStation field == stationId
  async findStationParcelsReports(stationId: string, date: string) {
    try {
      const { startOfDay, endOfDay } = this.calculateDateRange(date);

      const stationParcelsReports = await this.percelModel
        .find({
          sendingStation: stationId,
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        })
        .populate('sendingStation', 'name');

      return stationParcelsReports;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ??
          `Something went wrong while fetching the station's parcels reports`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findStationBookingsReports(stationId: string, date: string) {
    try {
      const { startOfDay, endOfDay } = this.calculateDateRange(date);

      const stationBookingsReports = await this.bookingModel
        .find({
          sendingStation: stationId,
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        })
        .populate('sendingStation', 'name');

      return stationBookingsReports;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ??
          `Something went wrong while fetching the station's bookings reports`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findStationCollectionsReports(stationId: string, date: string) {
    try {
      const { startOfDay, endOfDay } = this.calculateDateRange(date);

      const stationCollectionsReports = await this.lipaNaMpesaTransactionModel
        .find({
          station: stationId,
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        })
        .populate('station', 'name');

      return stationCollectionsReports;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ??
          `Something went wrong while fetching the station's money collections reports`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private calculateDateRange(date: string): {
    startOfDay: Date;
    endOfDay: Date;
  } {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return { startOfDay, endOfDay };
  }
}
